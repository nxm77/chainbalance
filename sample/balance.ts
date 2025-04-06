import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { formatEther } from 'viem'

async function getEthBalance(address: string) {
  const client = createPublicClient({
    chain: mainnet,
    transport: http()
  })

  try {
    // 获取 ETH 余额
    const balance = await client.getBalance({ address: address as `0x${string}` })

    // 将余额从 Wei 转换为 ETH
    const balanceInEth = formatEther(balance)

    console.log(`地址 ${address} 的 ETH 余额：${balanceInEth} ETH`)
    return balanceInEth
  } catch (error) {
    console.error('获取 ETH 余额时出错：', error)
    throw error
  }
}

const address = '0xC6153b257c17E6be167344635899a5C6549b9899'
getEthBalance(address)