import {
    IDexWalletBalanceProvider,
  } from "../interface";
import { createPublicClient, http, formatEther } from "viem";
import { bsc } from "viem/chains";
import {withTimeout} from "../libs/utils";

export class BscWalletProvider implements IDexWalletBalanceProvider {
  constructor(private userAddress: string) {}

  async getBalance(): Promise<number> {
    const client = createPublicClient({
      chain: bsc,
      transport: http(),
    });

    const balance = await withTimeout(
      client.getBalance({
        address: this.userAddress as `0x${string}`,
      }),
      60_000,
      "fetching bsc balance timeout"
    );
    return parseFloat(formatEther(balance));
  }
}
  