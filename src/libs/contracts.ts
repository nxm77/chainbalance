import BN, { BigNumber } from "bignumber.js";
import { ERC20, UniswapV2LPToken, PancakeV2LPToken } from "./abi";
import { AIem } from "./aiem";
import { Fields } from "@dappworks/kit/aiem";

export class ERC20Entity {
  address: `0x${string}` = "0x";
  chainId: string = "1";
  static abi = ERC20;

  get contract() {
    return AIem.Get(ERC20, this.chainId, this.address);
  }

  @Fields.read()
  balanceOf: (address: string) => Promise<any>;

  @Fields.read()
  totalSupply: any;

  @Fields.read()
  decimals: any;

  @Fields.read()
  symbol: any;

  @Fields.write()
  approve: (receiver: string, amount: string) => Promise<string>;

  constructor(args: Partial<ERC20Entity>) {
    Object.assign(this, args);
  }
}


export class UniswapV2LPEntity {
  address: `0x${string}` = "0x";
  chainId = "1" as const;
  static abi = UniswapV2LPToken;

  constructor(args: Partial<UniswapV2LPEntity>) {
    Object.assign(this, args);
  }

  get contract() {
    return AIem.Get(UniswapV2LPToken, this.chainId, this.address);
  }

  @Fields.read()
  totalSupply: any;

  @Fields.read()
  decimals: any;

  @Fields.read()
  token0: `0x${string}`;

  @Fields.read()
  token1: `0x${string}`;

  @Fields.read()
  getReserves: any;

  @Fields.read()
  balanceOf: (address: string) => Promise<any>;

  @Fields.contract<UniswapV2LPEntity, ERC20Entity>(() => ERC20Entity, "token0")
  Token0: ERC20Entity;

  @Fields.contract<UniswapV2LPEntity, ERC20Entity>(() => ERC20Entity, "token1")
  Token1: ERC20Entity;

  @Fields.custom()
  async userInfo(address: `0x${string}`) {
    const {
      Token0,
      Token1,
      getReserves: reverse,
      balanceOf: lpBalance,
      totalSupply,
    } = await AIem.Query(UniswapV2LPEntity, {
      getReserves: true,
      balanceOf: [address],
      totalSupply: true,
      Token0: {
        decimals: true,
        symbol: true,
      },
      Token1: {
        decimals: true,
        symbol: true,
      },
    })({ address: this.address, chainId: this.chainId });

    const lpShare = new BigNumber(lpBalance.toString()).dividedBy(
      totalSupply.toString()
    );
    const [reverse0, reverse1] = reverse;
    const lpBalance0 = lpShare
      .multipliedBy(reverse0.toString())
      .dividedBy(10 ** Token0.decimals);
    const lpBalance1 = lpShare
      .multipliedBy(reverse1.toString())
      .dividedBy(10 ** Token1.decimals);

    return {
      lpShare,
      lpBalance0: `${lpBalance0} ${Token0.symbol}`,
      lpBalance1: `${lpBalance1} ${Token1.symbol}`,
    };
  }
}

export class PancakeV2LPEntity {
  address: `0x${string}` = "0x";
  chainId = "56" as const;
  static abi = PancakeV2LPToken;

  constructor(args: Partial<PancakeV2LPEntity>) {
    Object.assign(this, args);
  }

  get contract() {
    return AIem.Get(UniswapV2LPToken, this.chainId, this.address);
  }

  @Fields.read()
  totalSupply: any;

  @Fields.read()
  decimals: any;

  @Fields.read()
  token0: `0x${string}`;

  @Fields.read()
  token1: `0x${string}`;

  @Fields.read()
  getReserves: any;

  @Fields.read()
  balanceOf: (address: string) => Promise<any>;

  @Fields.contract<PancakeV2LPEntity, ERC20Entity>(() => ERC20Entity, "token0")
  Token0: ERC20Entity;

  @Fields.contract<PancakeV2LPEntity, ERC20Entity>(() => ERC20Entity, "token1")
  Token1: ERC20Entity;

  @Fields.custom()
  async userInfo(address: `0x${string}`) {
    const {
      Token0,
      Token1,
      getReserves: reverse,
      balanceOf: lpBalance,
      totalSupply,
    } = await AIem.Query(PancakeV2LPEntity, {
      getReserves: true,
      balanceOf: [address],
      totalSupply: true,
      Token0: {
        decimals: true,
        symbol: true,
      },
      Token1: {
        decimals: true,
        symbol: true,
      },
    })({ address: this.address, chainId: this.chainId });

    const lpShare = new BigNumber(lpBalance.toString()).dividedBy(
      totalSupply.toString()
    );
    const [reverse0, reverse1] = reverse;
    const lpBalance0 = lpShare
      .multipliedBy(reverse0.toString())
      .dividedBy(10 ** Token0.decimals);
    const lpBalance1 = lpShare
      .multipliedBy(reverse1.toString())
      .dividedBy(10 ** Token1.decimals);

    return {
      lpShare,
      lpBalance0: `${lpBalance0} ${Token0.symbol}`,
      lpBalance1: `${lpBalance1} ${Token1.symbol}`,
    };
  }
}

