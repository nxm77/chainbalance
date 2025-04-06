# ChainBalance

## Set up

### Install Bun

https://bun.sh/docs/installation

## How to run with Bun

1. install library

```
bun i
```

2. run main file

```
bun run index.ts
```

### Lib Explain

##### PromiseHook

```ts
class ERC20 {
  address: `0x${string}` = "0x";
  chainId = "1" as const;

  get contract() {
    return aiem.Get(`ERC20`, this.chainId, this.address);
  }
  symbol = PromiseHook.wrap({
    func: async () => {
      return this.contract.read.symbol();
    },
  });

  decimals = PromiseHook.wrap({
    lazy: true,
    func: async () => {
      return this.contract.read.decimals();
    },
  });

  static Get = PromiseHook.Get(ERC20);
}

const erc20 = await ERC20.Get({ args: { address: "0x123", chainId: "1" } });

erc20.symbol.value; // auto load value
erc20.decimals.get(); // lazy load value

erc20.symbol.call(); // force refresh value
```
