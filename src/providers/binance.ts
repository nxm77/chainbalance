import { Position, Balances } from "ccxt";
import { ICexWalletBalanceProvider } from "../interface";
import { exchange } from "../libs/exchange";
import { withTimeout } from "../libs/utils"; // 👈 import here

export class BinanceWalletProvider implements ICexWalletBalanceProvider {
  async getMargin(): Promise<Balances> {
    return await withTimeout(
      exchange.fetchBalance({ type: "margin", marginMode: "cross" }),
      60000,
      "getMargin timed out"
    );
  }

  async getFuturesBal(): Promise<Balances> {
    return await withTimeout(
      exchange.fetchBalance({ type: 'future', portfolioMargin: true }),
      60000,
      "getFuturesBal timed out"
    );
  }

  async getCexPos(symbol: string): Promise<Position> {
    const positions = await withTimeout(
      exchange.fetchPositions([symbol], { portfolioMargin: true }),
      60000,
      "getCexPos timed out"
    );
    return positions[0];
  }

  async getHourlyClose(symbol: string): Promise<number> {
    const spotOHLCV = await withTimeout(
      exchange.fetchOHLCV(symbol, "1h"),
      60000,
      "getHourlyClose timed out"
    );
    return Number(spotOHLCV[spotOHLCV.length - 1][1]);
  }

  async getFundingRateInfo(symbol: string) {
    const fundingRateOrderBook = await withTimeout(
      exchange.fetchFundingRate(symbol),
      60000,
      "getFundingRateInfo timed out"
    );

    const fundingRate = Number(fundingRateOrderBook.fundingRate);
    const frUpdateTime = String(fundingRateOrderBook.fundingDatetime);
    const len = frUpdateTime.length;
    const frtime = frUpdateTime.substring(0, len - 5);

    return { fundingRate, frtime };
  }
}