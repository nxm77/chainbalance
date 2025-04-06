import { ITradingStrategy, ReportingMetrics } from "../interface";
import { setTargetPosition } from "../services/trading";
import { BinanceWalletProvider } from "../providers";
import { PancakeV2DataProvider } from "../providers/pancakev2";
import { BscWalletProvider } from "../providers/bsc-dex";
import { LP } from "../libs/const";
import { db } from "../libs/db";
import {withTimeout} from "../libs/utils";

export class BnbHedgingStrategy implements ITradingStrategy {
  private pancakeProvider: PancakeV2DataProvider;
  private cexWalletProvider: BinanceWalletProvider;
  private dexBSCWalletProvider: BscWalletProvider;

  constructor(account: string) {
    this.pancakeProvider = new PancakeV2DataProvider(
      LP.BNB_USDT.address,
      account
    );
    this.cexWalletProvider = new BinanceWalletProvider();
    this.dexBSCWalletProvider = new BscWalletProvider(account);
  }

  async calculateTargetPosition(): Promise<number> {
    // const cexMargin = await this.cexWalletProvider.getMargin();
    const cexMargin = await withTimeout(
      this.cexWalletProvider.getMargin(),
      60_000,
      "fetching cex margin timeout"
    );

    const cexBNBMargin = cexMargin.BNB.total!;

    // const posPancake = await this.pancakeProvider.getPositions();
    const posPancake = await withTimeout(
      this.pancakeProvider.getPositions(),
      60_000,
      "fetching pancake pos timeout"
    );

    const lpBNB = posPancake[LP.BNB_USDT.BNB];

    // const dexBalanceBNB = await this.dexBSCWalletProvider.getBalance();
    const dexBalanceBNB = await withTimeout(
      this.dexBSCWalletProvider.getBalance(),
      60_000,
      "fetching bnb dex balance timeout"
    );

    const targetBNBPos = -lpBNB - cexBNBMargin - dexBalanceBNB;
    return targetBNBPos;
  }

  async sendTargetPosition(): Promise<void> {
    // const targetPos = await this.calculateTargetPosition();

    const targetPos = await withTimeout(
      this.calculateTargetPosition(),
      60_000,
      "calculating target position timeout"
    );

    const now = (new Date()).toISOString();

    const targetPositions = [
      {
        exchange: "Binance",
        contractType: "UsdtMarginPerpetualFuture",
        symbol: "BNBUSDT",
        target: targetPos,
        time: now,
      }
    ];

    const req = {
      time: now,
      requests: targetPositions,
    };

    const reqJson = JSON.stringify(req);
    // console.log(targetPositions)
    // await setTargetPosition(reqJson);
    await withTimeout(
      setTargetPosition(reqJson),
      60_000,
      "setting target position timeout"
    );
  }

  async reportMetrics(): Promise<ReportingMetrics> {
    const currentTime = new Date();
    const spotSymbol = "BNB/USDT";
    const perpSymbol = "BNB/USDT:USDT";

    // const posPancake = await this.pancakeProvider.getPositions();
    const posPancake = await withTimeout(
      this.pancakeProvider.getPositions(),
      60_000,
      "fetching pancake pos timeout"
    );

    const lpBalanceBNB = posPancake[LP.BNB_USDT.BNB];
    const lpBalanceUSDT = posPancake[LP.BNB_USDT.USDT];
    
    // const dexWalletBalance1 = await this.dexBSCWalletProvider.getBalance();
    const dexWalletBalance1 = await withTimeout(
      this.dexBSCWalletProvider.getBalance(),
      60_000,
      "fetching dex balance timeout"
    );
    // const targetPos = await this.calculateTargetPosition();
    const targetPos = await withTimeout(
      this.calculateTargetPosition(),
      60_000,
      "calculating target position timeout"
    );

    // const cexSpotPrc = await this.cexWalletProvider.getHourlyClose(spotSymbol);
    const cexSpotPrc = await withTimeout(
      this.cexWalletProvider.getHourlyClose(spotSymbol),
      60_000,
      "fetching cex spot price timeout"
    );

    // const cexPerpPrc = await this.cexWalletProvider.getHourlyClose(perpSymbol);
    const cexPerpPrc = await withTimeout(
      this.cexWalletProvider.getHourlyClose(perpSymbol),
      60_000,
      "fetching cex perp price timeout"
    );
    
    // const markPrc = Number((await this.cexWalletProvider.getCexPos(perpSymbol)).markPrice);
    const cexPos = await withTimeout(
      this.cexWalletProvider.getCexPos(perpSymbol),
      60_000,
      'Fetching CEX position timed out'
    );
    const markPrc = Number(cexPos.markPrice);

    // const fundingRate = (await this.cexWalletProvider.getFundingRateInfo(perpSymbol)).fundingRate;
    // const frtime = (await this.cexWalletProvider.getFundingRateInfo(perpSymbol)).frtime;
    
    // const cexMargin = await this.cexWalletProvider.getMargin();
    const fundingRateInfo = await withTimeout(
      this.cexWalletProvider.getFundingRateInfo(perpSymbol),
      60_000,
      'Fetching funding rate info timed out'
    );
    
    const fundingRate = fundingRateInfo.fundingRate;
    const frtime = fundingRateInfo.frtime;
    
    const cexMargin = await withTimeout(
      this.cexWalletProvider.getMargin(),
      60_000,
      'Fetching CEX margin timed out'
    );

    const cexBNBMargin = cexMargin.BNB.total!;
    // const cexFuturesPos = Number((await this.cexWalletProvider.getCexPos(perpSymbol))["info"].positionAmt);
    const cexFuturesPoition = await withTimeout(
      this.cexWalletProvider.getCexPos(perpSymbol),
      60_000,
      'Fetching CEX position timed out'
    );
    const cexFuturesPos = Number(cexFuturesPoition.info.positionAmt);

    
    const cexMarginMtm = cexBNBMargin*cexSpotPrc;
    // const cexFuturesMtm = Number((await this.cexWalletProvider.getFuturesBal()).USDT.total);
    const futuresBal = await withTimeout(
      this.cexWalletProvider.getFuturesBal(),
      60_000,
      'Fetching futures balance timed out'
    );
    const cexFuturesMtm = Number(futuresBal.USDT.total);

    const dexBalMtm = (lpBalanceBNB+dexWalletBalance1)*cexSpotPrc + lpBalanceUSDT;

    try {
      await withTimeout(
        db`
          INSERT INTO BNB_USDT (
            dex_pos0, dex_pos1, dex_wallet_balance,
            cex_pos1, cex_spot_prc, cex_perp_prc, cex_mark_prc, 
            cex_fr, cex_fr_update_time, margin, cex_current_future_pos
          )
          VALUES (
            ${lpBalanceUSDT}, ${lpBalanceBNB}, ${dexWalletBalance1},
            ${targetPos}, ${cexSpotPrc}, ${cexPerpPrc}, ${markPrc},
            ${fundingRate}, ${frtime}, ${cexBNBMargin}, ${cexFuturesPos}
          );
        `,
        60_000, // 1 minute
        'Database insert timed out'
      );
    
      console.log(`update db at ${currentTime}`);
    } catch (error) {
      console.error(`Error updating database: ${error}`);
    }

    return { 
      targetPos: targetPos,
      futuresPos: cexFuturesPos,
      coinMargin: cexMarginMtm,
      marginUSDT: cexMargin.USDT.total!,
      futuresmarginUSDT: cexFuturesMtm,
      totalFuturesVal: -cexFuturesPos*cexSpotPrc,
      dexBalMtm: dexBalMtm
    }
  }
}
