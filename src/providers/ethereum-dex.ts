import {
  IDexWalletBalanceProvider,
} from "../interface";
import { createPublicClient, http, formatEther } from "viem";
import { mainnet } from "viem/chains";

export class EthereumWalletProvider implements IDexWalletBalanceProvider {
  constructor(private userAddress: string) {}

  async getBalance(): Promise<number> {
    const client = createPublicClient({
      chain: mainnet,
      transport: http(),
    });
    const balance = await client.getBalance({
      address: this.userAddress as `0x${string}`,
    });
    return parseFloat(formatEther(balance));
  }
}
