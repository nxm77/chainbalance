import { ITradingStrategy, ReportingMetrics } from "../interface";
import { setTargetPosition } from "../services/trading";
import {
  UniswapV2DataProvider,
  BinanceWalletProvider,
  EthereumWalletProvider,
} from "../providers";
import { LP } from "../libs/const";
import { db } from "../libs/db";

export class EthHedgingStrategy implements ITradingStrategy {
  private uniswapProvider: UniswapV2DataProvider;
  private cexWalletProvider: BinanceWalletProvider;
  private dexETHWalletProvider: EthereumWalletProvider;

  constructor(account: string) {
    this.uniswapProvider = new UniswapV2DataProvider(
      LP.ETH_USDT.address,
      account
    );
    this.cexWalletProvider = new BinanceWalletProvider();
    this.dexETHWalletProvider = new EthereumWalletProvider(account);
  }

  async calculateTargetPosition(): Promise<number> {
    const cexMargin = await this.cexWalletProvider.getMargin();
    const cexETHMargin = cexMargin.ETH.total!;

    const posUniswap = await this.uniswapProvider.getPositions();
    const lpETH = posUniswap[LP.ETH_USDT.ETH];

    const dexBalanceETH = await this.dexETHWalletProvider.getBalance();

    const targetETHPos = -lpETH - cexETHMargin - dexBalanceETH;
    return targetETHPos;
  }

  async sendTargetPosition(): Promise<void> {
    const targetPos = await this.calculateTargetPosition();
    const now = (new Date()).toISOString();

    const targetPositions = [
      {
        exchange: "Binance",
        contractType: "UsdtMarginPerpetualFuture",
        symbol: "ETHUSDT",
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
    await setTargetPosition(reqJson);
  }

  async reportMetrics(): Promise<ReportingMetrics> {
    const currentTime = new Date();
    const spotSymbol = "ETH/USDT";
    const perpSymbol = "ETH/USDT:USDT";

    const posUniswap = await this.uniswapProvider.getPositions();
    const lpBalanceETH = posUniswap[LP.ETH_USDT.ETH];
    const lpBalanceUSDT = posUniswap[LP.ETH_USDT.USDT];
    const dexWalletBalance1 = await this.dexETHWalletProvider.getBalance();
    const targetPos = await this.calculateTargetPosition();

    const cexSpotPrc = await this.cexWalletProvider.getHourlyClose(spotSymbol);
    const cexPerpPrc = await this.cexWalletProvider.getHourlyClose(perpSymbol);
    const markPrc = Number((await this.cexWalletProvider.getCexPos(perpSymbol)).markPrice);
    const fundingRate = (await this.cexWalletProvider.getFundingRateInfo(perpSymbol)).fundingRate;
    const frtime = (await this.cexWalletProvider.getFundingRateInfo(perpSymbol)).frtime;
    
    const cexMargin = await this.cexWalletProvider.getMargin();
    const cexETHMargin = cexMargin.ETH.total!;
    const cexFuturesPos = Number((await this.cexWalletProvider.getCexPos(perpSymbol))["info"].positionAmt);
    
    const cexMarginMtm = cexETHMargin*cexSpotPrc;
    const cexFuturesMtm = Number((await this.cexWalletProvider.getFuturesBal()).USDT.total);
    const dexBalMtm = (lpBalanceETH+dexWalletBalance1)*cexSpotPrc + lpBalanceUSDT;

    try{
      await db`
          INSERT INTO ETH_USDT (dex_pos0, dex_pos1, dex_wallet_balance, cex_pos1, cex_spot_prc, cex_perp_prc, cex_mark_prc, 
              cex_fr, cex_fr_update_time, margin, cex_current_future_pos)
          VALUES (${lpBalanceUSDT}, ${lpBalanceETH}, ${dexWalletBalance1}, ${targetPos}, ${cexSpotPrc}, ${cexPerpPrc},
              ${markPrc}, ${fundingRate}, ${frtime}, ${cexETHMargin}, ${cexFuturesPos});`;
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
