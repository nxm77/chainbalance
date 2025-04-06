
import { AIem as IAIem } from '@dappworks/kit/aiem'
import { Chain, type GetContractReturnType, createPublicClient, getContract, http, type Abi, PublicClient, HttpTransport, webSocket, WebSocketTransport } from 'viem'
import { fantom, mainnet, bsc } from 'viem/chains'

//@ts-ignore
mainnet.rpcUrls.default.http = ['https://eth-mainnet.g.alchemy.com/v2/98OrGEtrNEQ0ZDs953HdB0l39NZaDTXb']
//@ts-ignore
mainnet.rpcUrls.default.webSocket = ["wss://eth-mainnet.g.alchemy.com/v2/98OrGEtrNEQ0ZDs953HdB0l39NZaDTXb"]

//@ts-ignore
// bsc.rpcUrls.default.http = ["https://binance.llamarpc.com"]
bsc.rpcUrls.default.http = ["https://bsc-rpc.publicnode.com"]


export class AIem<Contracts extends Record<string, Abi>, Chains extends Record<string, Chain>, Addrs extends {
    [K in keyof Contracts]?: {
        [key: string]: `${string}-0x${string}`;
    };
}> extends IAIem<Contracts, Chains, Addrs> {
    static WsClient(chainId: string | number): PublicClient<WebSocketTransport, Chain, any, any> {
        const aiem = this.init()
        //@ts-ignore
        return aiem.cache.wrap(`wsClient-${String(chainId)}`, () => {
            // //@ts-ignore
            return createPublicClient({
                //@ts-ignore
                chain: aiem.chainMap[chainId],
                transport: webSocket()
            }) as PublicClient<WebSocketTransport, Chain, any, any>
        })
    }
}