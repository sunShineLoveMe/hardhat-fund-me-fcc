const { assert, expect } = require("chai")
const { deployments, ethers, network } = require("hardhat")


/***
 * 这段代码的作用是：用于测试名为“FundMe”的Solidity智能合约的构造函数是否正确设置了价格聚合器地址
 */
describe("FundMe", function() {
    let fundMe
    let deployer
    let mockV3Aggregator

    beforeEach(async ()=> {
        // 获取部署者地址
        deployer = (await getNamedAccounts()).deployer
        console.log("deployer: ", deployer)
        // 部署所有合约
        await deployments.fixture(["all"])
        console.log("-------------*****---------------")
        // 获取FundMe合约实例
        fundMe = await ethers.getContract("FundMe", deployer)
        console.log(`fundMe地址: ${fundMe}`)
        // console.log("----------------------------")
        // 获取MockV3Aggregator合约实例
        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator", 
            deployer
        )
    })

    // describe("fund", async function() {
    //     it("Fails if you dont send enough ETH", async() => {
    //         await expect(fundMe.fund()).to.be.revertedWith(
    //             "You need to send more ETH!")
    //     })
    // })

    // 定义测试用例
    describe("constructor", function() {
        it("sets the aggregator address correctly", async() => {
            // 获取FundMe合约中的价格聚合器地址
            const response = await fundMe.getPriceFeed()
            // 断言价格聚合器地址是否与MockV3Aggregator合约地址相等
            assert.equal(response, mockV3Aggregator.address)
        })
    })
})