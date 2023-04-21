require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")
require("hardhat-deploy")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
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
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337
    },
    sepolia: {
      url: process.env.ALCHEMY_API_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  namedAccounts: {
    deployer: {
      default: 0
    },
    user: {
      default: 1
    }
  }
};
