import { EthHedgingStrategy } from "./strategies";
import { BnbHedgingStrategy } from "./strategies/bnb-hedging";
import { setTelegramAlert } from "./services/alert";
import { db } from "./libs/db";

async function main() {
  console.log("[RUNNING] Updating market position...");

  const ethHedgingStrategy = new EthHedgingStrategy(
    "0x38f8b30067BE6AaaC130D2252c77D524b74edBEA"
  );
  await ethHedgingStrategy.sendTargetPosition();
  const ethMetrics = await ethHedgingStrategy.reportMetrics();

  const bnbHedgingStrategy = new BnbHedgingStrategy(
    "0x38f8b30067BE6AaaC130D2252c77D524b74edBEA"
  );
  await bnbHedgingStrategy.sendTargetPosition();
  const bnbMetrics = await bnbHedgingStrategy.reportMetrics();

  const marginMtm = ethMetrics.coinMargin + bnbMetrics.coinMargin + ethMetrics.marginUSDT;
  const futuresMtm = ethMetrics.futuresmarginUSDT;
  const dexBalMtm = ethMetrics.dexBalMtm + bnbMetrics.dexBalMtm;

  await db`
    INSERT INTO market_data (cex_margin_mtm, cex_future_mtm, dex_bal_mtm)
    VALUES (${marginMtm}, ${futuresMtm}, ${dexBalMtm});
  `;

  let message =
    `ETH target pos: ${ethMetrics.targetPos.toFixed(2)}\nETH futures pos: ${ethMetrics.futuresPos.toFixed(2)}\n` +
    `ETH exposure: ${(ethMetrics.futuresPos - ethMetrics.targetPos).toFixed(2)}\n\n` +
    `BNB target pos: ${bnbMetrics.targetPos.toFixed(2)}\nBNB futures pos: ${bnbMetrics.futuresPos.toFixed(2)}\n` +
    `BNB exposure: ${(bnbMetrics.futuresPos - bnbMetrics.targetPos).toFixed(2)}\n\n` +
    `Total:\nmargin as a fraction of futures: ${((marginMtm + futuresMtm) / (ethMetrics.totalFuturesVal + bnbMetrics.totalFuturesVal)).toFixed(2)}\n\n` +
    `total margin mtm: ${marginMtm.toFixed(2)}\n` +
    `total futures mtm: ${futuresMtm.toFixed(2)}\n` +
    `total dex bal: ${dexBalMtm.toFixed(2)}\n\n` +
    `total mtm: ${(marginMtm + futuresMtm + dexBalMtm).toFixed(2)}`;

  setTelegramAlert(message);
}

// Call main() and handle any errors
main().catch((err) => {
  console.error("Fatal error in main():", err);
});