const { network } = require("hardhat")
const { developmentChain, DECIMALS, INITIAL_ANSWER } = require("../helper-hardhat-config")

module.exports = async({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    // console.log(`deployer: ${deployer}`)
    // const chainId = network.config.chainId

    if(developmentChain.includes(network.name)) {
        log("Local network detected! Deploying Mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER]
        })

        log("Mocks deployed!")
        log("-----------------------------------")
    }
}

/**
 * deploy: 这是hardhat命令的子命令，用于部署智能合约
 * tags： 可选参数，可以用来选择要部署的某些合约，如果省略了这个参数，那么hardhat将尝试部署所有合约
 * --tags: 则只有带有相应标签的合约将被部署
 */
module.exports.tags = ["all", "mocks"]