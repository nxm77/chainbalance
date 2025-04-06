export const UniswapV2LPToken = [{ "type": "constructor", "inputs": [], "payable": false, "stateMutability": "nonpayable" }, { "name": "Approval", "type": "event", "inputs": [{ "name": "owner", "type": "address", "indexed": true, "internalType": "address" }, { "name": "spender", "type": "address", "indexed": true, "internalType": "address" }, { "name": "value", "type": "uint256", "indexed": false, "internalType": "uint256" }], "anonymous": false }, { "name": "Burn", "type": "event", "inputs": [{ "name": "sender", "type": "address", "indexed": true, "internalType": "address" }, { "name": "amount0", "type": "uint256", "indexed": false, "internalType": "uint256" }, { "name": "amount1", "type": "uint256", "indexed": false, "internalType": "uint256" }, { "name": "to", "type": "address", "indexed": true, "internalType": "address" }], "anonymous": false }, { "name": "Mint", "type": "event", "inputs": [{ "name": "sender", "type": "address", "indexed": true, "internalType": "address" }, { "name": "amount0", "type": "uint256", "indexed": false, "internalType": "uint256" }, { "name": "amount1", "type": "uint256", "indexed": false, "internalType": "uint256" }], "anonymous": false }, { "name": "Swap", "type": "event", "inputs": [{ "name": "sender", "type": "address", "indexed": true, "internalType": "address" }, { "name": "amount0In", "type": "uint256", "indexed": false, "internalType": "uint256" }, { "name": "amount1In", "type": "uint256", "indexed": false, "internalType": "uint256" }, { "name": "amount0Out", "type": "uint256", "indexed": false, "internalType": "uint256" }, { "name": "amount1Out", "type": "uint256", "indexed": false, "internalType": "uint256" }, { "name": "to", "type": "address", "indexed": true, "internalType": "address" }], "anonymous": false }, { "name": "Sync", "type": "event", "inputs": [{ "name": "reserve0", "type": "uint112", "indexed": false, "internalType": "uint112" }, { "name": "reserve1", "type": "uint112", "indexed": false, "internalType": "uint112" }], "anonymous": false }, { "name": "Transfer", "type": "event", "inputs": [{ "name": "from", "type": "address", "indexed": true, "internalType": "address" }, { "name": "to", "type": "address", "indexed": true, "internalType": "address" }, { "name": "value", "type": "uint256", "indexed": false, "internalType": "uint256" }], "anonymous": false }, { "name": "DOMAIN_SEPARATOR", "type": "function", "inputs": [], "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }], "payable": false, "constant": true, "stateMutability": "view" }, { "name": "MINIMUM_LIQUIDITY", "type": "function", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "payable": false, "constant": true, "stateMutability": "view" }, { "name": "PERMIT_TYPEHASH", "type": "function", "inputs": [], "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }], "payable": false, "constant": true, "stateMutability": "view" }, { "name": "allowance", "type": "function", "inputs": [{ "name": "", "type": "address", "internalType": "address" }, { "name": "", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "payable": false, "constant": true, "stateMutability": "view" }, { "name": "approve", "type": "function", "inputs": [{ "name": "spender", "type": "address", "internalType": "address" }, { "name": "value", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }], "payable": false, "constant": false, "stateMutability": "nonpayable" }, { "name": "balanceOf", "type": "function", "inputs": [{ "name": "", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "payable": false, "constant": true, "stateMutability": "view" }, { "name": "burn", "type": "function", "inputs": [{ "name": "to", "type": "address", "internalType": "address" }], "outputs": [{ "name": "amount0", "type": "uint256", "internalType": "uint256" }, { "name": "amount1", "type": "uint256", "internalType": "uint256" }], "payable": false, "constant": false, "stateMutability": "nonpayable" }, { "name": "decimals", "type": "function", "inputs": [], "outputs": [{ "name": "", "type": "uint8", "internalType": "uint8" }], "payable": false, "constant": true, "stateMutability": "view" }, { "name": "factory", "type": "function", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "payable": false, "constant": true, "stateMutability": "view" }, { "name": "getReserves", "type": "function", "inputs": [], "outputs": [{ "name": "_reserve0", "type": "uint112", "internalType": "uint112" }, { "name": "_reserve1", "type": "uint112", "internalType": "uint112" }, { "name": "_blockTimestampLast", "type": "uint32", "internalType": "uint32" }], "payable": false, "constant": true, "stateMutability": "view" }, { "name": "initialize", "type": "function", "inputs": [{ "name": "_token0", "type": "address", "internalType": "address" }, { "name": "_token1", "type": "address", "internalType": "address" }], "outputs": [], "payable": false, "constant": false, "stateMutability": "nonpayable" }, { "name": "kLast", "type": "function", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "payable": false, "constant": true, "stateMutability": "view" }, { "name": "mint", "type": "function", "inputs": [{ "name": "to", "type": "address", "internalType": "address" }], "outputs": [{ "name": "liquidity", "type": "uint256", "internalType": "uint256" }], "payable": false, "constant": false, "stateMutability": "nonpayable" }, { "name": "name", "type": "function", "inputs": [], "outputs": [{ "name": "", "type": "string", "internalType": "string" }], "payable": false, "constant": true, "stateMutability": "view" }, { "name": "nonces", "type": "function", "inputs": [{ "name": "", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "payable": false, "constant": true, "stateMutability": "view" }, { "name": "permit", "type": "function", "inputs": [{ "name": "owner", "type": "address", "internalType": "address" }, { "name": "spender", "type": "address", "internalType": "address" }, { "name": "value", "type": "uint256", "internalType": "uint256" }, { "name": "deadline", "type": "uint256", "internalType": "uint256" }, { "name": "v", "type": "uint8", "internalType": "uint8" }, { "name": "r", "type": "bytes32", "internalType": "bytes32" }, { "name": "s", "type": "bytes32", "internalType": "bytes32" }], "outputs": [], "payable": false, "constant": false, "stateMutability": "nonpayable" }, { "name": "price0CumulativeLast", "type": "function", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "payable": false, "constant": true, "stateMutability": "view" }, { "name": "price1CumulativeLast", "type": "function", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "payable": false, "constant": true, "stateMutability": "view" }, { "name": "skim", "type": "function", "inputs": [{ "name": "to", "type": "address", "internalType": "address" }], "outputs": [], "payable": false, "constant": false, "stateMutability": "nonpayable" }, { "name": "swap", "type": "function", "inputs": [{ "name": "amount0Out", "type": "uint256", "internalType": "uint256" }, { "name": "amount1Out", "type": "uint256", "internalType": "uint256" }, { "name": "to", "type": "address", "internalType": "address" }, { "name": "data", "type": "bytes", "internalType": "bytes" }], "outputs": [], "payable": false, "constant": false, "stateMutability": "nonpayable" }, { "name": "symbol", "type": "function", "inputs": [], "outputs": [{ "name": "", "type": "string", "internalType": "string" }], "payable": false, "constant": true, "stateMutability": "view" }, { "name": "sync", "type": "function", "inputs": [], "outputs": [], "payable": false, "constant": false, "stateMutability": "nonpayable" }, { "name": "token0", "type": "function", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "payable": false, "constant": true, "stateMutability": "view" }, { "name": "token1", "type": "function", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "payable": false, "constant": true, "stateMutability": "view" }, { "name": "totalSupply", "type": "function", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "payable": false, "constant": true, "stateMutability": "view" }, { "name": "transfer", "type": "function", "inputs": [{ "name": "to", "type": "address", "internalType": "address" }, { "name": "value", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }], "payable": false, "constant": false, "stateMutability": "nonpayable" }, { "name": "transferFrom", "type": "function", "inputs": [{ "name": "from", "type": "address", "internalType": "address" }, { "name": "to", "type": "address", "internalType": "address" }, { "name": "value", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }], "payable": false, "constant": false, "stateMutability": "nonpayable" }] as const;
export const PancakeV2LPToken = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}] as const;
export const ERC20 = [{ "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint256", "name": "initialSupply", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }] as const;