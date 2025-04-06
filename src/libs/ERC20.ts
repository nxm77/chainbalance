import { AIem, Fields } from "@dappworks/kit/aiem";
import { ERC20 } from "./abi";
import { helper } from "@dappworks/kit/utils";
import axios from "axios";
import DataLoader from "dataloader";
import _ from "lodash";
import BigNumber from "bignumber.js";
import { encodeFunctionData } from "viem";


export class ERC20Entity {
  address: `0x${string}` = '0x';
  chainId: string = "4689" as const
  static abi = ERC20

  get isEther() {
    return this.address === '0x0000000000000000000000000000000000000000'
  }

  async type() {
    return 'ERC20'
  }

  // @Fields.read({ ttl: 5 * 1000 })
  // balanceOf: (address: string) => Promise<string>

  @Fields.read()
  totalSupply: number

  @Fields.read({ ttl: 86400 * 1000 })
  name: string

  @Fields.read({ ttl: 86400 * 1000 })
  symbol: string

  async decimals() {
    return AIem.cache?.wrap(`${this.chainId}-${this.address}-decimals`, async () => {
      try {
        return AIem.Get(ERC20, this.chainId, this.address).read.decimals()
      } catch (error) {
        return 18
      }
    }, { ttl: 86400 * 1000 })
  }

  async balanceOf(account?: `0x${string}`) {
    if (!account) return helper.number.warpBigNumber('0')
    const decimals = await this.decimals()
    const balanceOf = await AIem.Get(ERC20, this.chainId, this.address).read.balanceOf([account])
    return helper.number.warpBigNumber(balanceOf.toString(), decimals)
  }

  @Fields.read()
  allowance: (owner: string, spender: string) => Promise<any>


  async approve(spender: `0x${string}`, amount: string, owner: `0x${string}`) {
    const allowance = await AIem.Get(ERC20, this.chainId, this.address).read.allowance([owner, spender])
    if (allowance.toString().includes('e')) return null
    if (new BigNumber(allowance.toString()).isLessThan(new BigNumber(amount))) {
      const data = encodeFunctionData({
        abi: ERC20,
        functionName: 'approve',
        args: [spender, BigInt(amount)]
      })
      return data
    }
    return null
  }

  async priceUSD() {
    return ERC20Service.getToken({ address: this.address.toLowerCase() }).then((i) => i?.current_price);
  }

  async tokenUrl() {
    try {
      const LogoMap = {
        "1": {
          '0x0000000000000000000000000000000000000000': 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
        },
        "56": {
          '0x0000000000000000000000000000000000000000': 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        },
        "137": {
          '0x0000000000000000000000000000000000000000': 'https://coingecko-proxy.iopay.me/coins/images/4713/large/polygon.png?1698233745',
        },
        "4689": {
          '0x0000000000000000000000000000000000000000': 'https://cryptologos.cc/logos/iotex-iotx-logo.svg?v=029',
        },
        "4690": {
          '0x0000000000000000000000000000000000000000': 'https://cryptologos.cc/logos/iotex-iotx-logo.svg?v=029',
        },
      };
      //@ts-ignore
      return LogoMap[this.chainId][this.address] || `https://info.mimo.exchange/image/${this.address}`;
    } catch (error) {
      return 'https://cryptologos.cc/logos/iotex-iotx-logo.svg?v=029'; // https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png
    }
  }
}


export class ERC20Service {
  static iotexPrice = async (): Promise<number> => {
    return (await AIem.cache?.wrap('iotex-price', async () => {
      const iotexRes = await axios.get("https://api.iotexscan.io/api/rest/iotex_price")
      return Number(iotexRes.data.kv[0].value) ?? 0
    }, { ttl: 300 * 1000 }))!
  }
  static tokenList = async ({ network = 'iotex' }) => {
    return AIem.cache?.wrap(
      `tokenList-${network}`,
      async () => {
        try {
          const res = await axios.get(`https://api.iopay.me/api/rest/token_list/${network}`);
          return res.data.token_list_v4;
        } catch (error) {
          console.log(error);
          return [];
        }
      },
      { ttl: 15 * 1000 },
    );
  };
  //@ts-ignore
  static tokenLoader = new DataLoader(async (ids: string[]) => {
    const res: any = await ERC20Service.tokenList({ network: 'iotex' });
    const data = _.keyBy(res, 'address');
    return ids.map((i) => data[i] || ({} as (typeof data)[0]));
  });
  static async getToken({ address }: { address: string }) {
    // for test
    const addressMap = {
      '0x0000000000000000000000000000000000000000': '0xa00744882684c3e4747faefd68d283ea44099d03',
      '0x180dC617701A507239659215D19FA142eD3B91A7': '0x236f8c0a61da474db21b693fb2ea7aab0c803894',
      '0x96dC256Ea343ae8b13999C73562e5D6B457a8501': '0xa00744882684c3e4747faefd68d283ea44099d03',
    };
    //@ts-ignore
    address = addressMap[address] || address;
    return this.tokenLoader.load(address);
  }
}
