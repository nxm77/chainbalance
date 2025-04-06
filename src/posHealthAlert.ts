import cron from "node-cron";
import { BinanceWalletProvider, EthereumWalletProvider, UniswapV2DataProvider } from "./providers";
import { PancakeV2DataProvider } from "./providers/pancakev2";
import { BscWalletProvider } from "./providers/bsc-dex";
import { LP } from "./libs/const";
import { withTimeout } from "./libs/utils";
import { setTelegramAlert } from "./services/alert";



const MARGIN_RATIO_THRESHOLD = 0.2;
const account = "0x38f8b30067BE6AaaC130D2252c77D524b74edBEA";

async function fetchEthMetrics() {
  const spotSymbol = "ETH/USDT";
  const perpSymbol = "ETH/USDT:USDT";
  const cex = new BinanceWalletProvider();

  const cexMargin = await withTimeout(cex.getMargin(), 60_000, "ETH: getMargin timeout");
  const cexFuturesPos = Number((await cex.getCexPos(perpSymbol))["info"].positionAmt);

  const ethMargin = cexMargin.ETH.total!;

  const [spotPrc, futuresBal] = await Promise.all([
    cex.getHourlyClose(spotSymbol),
    cex.getFuturesBal(),
  ]);

  const coinMargin = ethMargin * spotPrc;
  const cexFuturesPosUSDT = cexFuturesPos * spotPrc;
  const margingUSDT = cexMargin.USDT.total!;
  const futuresmarginUSDT = Number(futuresBal.USDT.total);

  return { coinMargin, margingUSDT, futuresmarginUSDT, cexFuturesPos, cexFuturesPosUSDT };
}

async function fetchBnbMetrics() {
  const spotSymbol = "BNB/USDT";
  const perpSymbol = "BNB/USDT:USDT";
  const cex = new BinanceWalletProvider();

  const cexMargin = await withTimeout(cex.getMargin(), 60_000, "BNB: getMargin timeout");
  const cexFuturesPos = Number((await cex.getCexPos(perpSymbol))["info"].positionAmt);

  const bnbMargin = cexMargin.BNB.total!;

  const [spotPrc, futuresBal] = await Promise.all([
    cex.getHourlyClose(spotSymbol),
    cex.getFuturesBal(),
  ]);

  const coinMargin = bnbMargin * spotPrc;
  const margingUSDT = cexMargin.USDT.total!;
  const futuresmarginUSDT = Number(futuresBal.USDT.total);
  const cexFuturesPosUSDT = cexFuturesPos * spotPrc;

  return { coinMargin, margingUSDT, futuresmarginUSDT, cexFuturesPos, cexFuturesPosUSDT };
}

async function checkHealth() {
  console.log("[RUNNING] Checking margin ratio...");

  try {
    const [eth, bnb] = await Promise.all([fetchEthMetrics(), fetchBnbMetrics()]);

    const marginMtm = eth.coinMargin + bnb.coinMargin + eth.margingUSDT + bnb.futuresmarginUSDT;
    const netDelta = eth.coinMargin + bnb.coinMargin + eth.cexFuturesPosUSDT + bnb.cexFuturesPosUSDT;
    const marginRatio = marginMtm / Math.abs(netDelta);
    console.log(`[INFO] Margin Ratio: ${(marginRatio * 100).toFixed(2)}%`);

    if (marginRatio < MARGIN_RATIO_THRESHOLD) {
      const msg = `Margin Ratio Alert!\n` +
        `Current: ${(marginRatio * 100).toFixed(2)}%\n` +
        `Threshold: ${(MARGIN_RATIO_THRESHOLD * 100).toFixed(2)}%`;
      await setTelegramAlert(msg);
    }
  } catch (err) {
    console.error("[ERROR] checkHealth failed:", err);
  }
}

cron.schedule("*/2 * * * *", checkHealth);

// // Test run
// checkHealth().then(() => {
//   console.log("[DONE] Finished test run.");
// });
