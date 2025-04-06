import { Balances } from "ccxt";

export interface ISwapDataProvider {
  getPositions(): Promise<{ [key: string]: number }>;
}

export interface ICexWalletBalanceProvider {

  // getBalance(): Promise<number>;
  
  /**
   * 获取 margin (保证金)
   */
  getMargin(): Promise<Balances>;
}

export interface IDexWalletBalanceProvider {

  // getBalance(): Promise<number>;
  
  /**
   * 获取 dex 余额
   */
  getBalance(): Promise<number>;
}

export interface ITradingStrategy {
  calculateTargetPosition(): Promise<number>;
  sendTargetPosition(): Promise<void>;
  reportMetrics(): Promise<ReportingMetrics>;
}

export interface ReportingMetrics {
  targetPos: number,
  futuresPos: number,
  coinMargin: number,
  marginUSDT: number,
  futuresmarginUSDT: number,
  totalFuturesVal: number,
  dexBalMtm: number
}
