// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;


/***
 * mockV3Aggregator 是一个伪造的价格聚合起合约，用于测试和模拟实际的价格聚合起合约
 * 在智能合约测试中，通常使用mockV3Aggregator来模拟实际价格聚合起的返回，并且验证
 * 智能合约对这些返回值的处理是否正确。
 */
import "@chainlink/contracts/src/v0.6/tests/MockV3Aggregator.sol";
