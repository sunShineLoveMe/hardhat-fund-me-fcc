const { network } = require("hardhat");
const { networkConfig, developmentChain } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

/**
 * @ deployer: 部署合约的账户
 */

module.exports = async({ getNamedAccounts, deployments }) => {

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress
    if(developmentChain.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if(!developmentChain.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(fundMe.address, args)
    }
    log("----------------------------")
}

/**
 * deploy: 这是hardhat命令的子命令，用于部署智能合约
 * tags： 可选参数，可以用来选择要部署的某些合约，如果省略了这个参数，那么hardhat将尝试部署所有合约
 * --tags: 则只有带有相应标签的合约将被部署
 */
module.exports.tags = ["all", "fundme"]