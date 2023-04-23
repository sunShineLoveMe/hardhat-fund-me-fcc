require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")
require("hardhat-deploy")

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6
    }
  },
  solidity: {
    compilers: [
      { 
        version: "0.8.8" 
      }, 
      { 
        version: "0.6.6" 
      }
    ]
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    noColor: true,
    currency: 'USD',
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "MATIC"
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  /**
   * 这是一个键值对，用于将索引号 1 映射到索引号 0 上。这意味着，当使用索引号 1 时，
   * 实际上将使用索引号 0 对应的帐户地址。这对于确保不同网络环境下的索引号一致性非常有用
   */
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0
    }
  }
};
