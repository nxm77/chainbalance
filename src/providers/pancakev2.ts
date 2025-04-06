import { ISwapDataProvider } from "../interface";
import { AIem } from "../libs/aiem";
import { PancakeV2LPEntity } from "../libs/contracts";
import {withTimeout} from "../libs/utils";

export class PancakeV2DataProvider implements ISwapDataProvider {

  constructor(private lpAddress: string, private accountAddress: string) {}

  async getPositions(): Promise<{ [key: string]: number }> {
    const lp = await withTimeout(
      AIem.Query(PancakeV2LPEntity, {
      totalSupply: true,
      getReserves: true,
      token0: true,
      token1: true
    })({ address: this.lpAddress as `0x${string}` }),
    60_000,
    "fetching pancake lp info timeout"
    );

    const lpToken0 = lp.token0;
    const lpToken1 = lp.token1;

    // const data = await lp.userInfo(this.accountAddress as `0x${string}`);

    const data = await withTimeout(
      lp.userInfo(this.accountAddress as `0x${string}`),
      60_000,
      "fetching pancake user_info timeout"
    );
    const lpBalance0 = parseFloat(data.lpBalance0.toString());
    const lpBalance1 = parseFloat(data.lpBalance1.toString());
    return {
      [lpToken0]: lpBalance0,
      [lpToken1]: lpBalance1,
    }
  }
}
