import { expect } from "chai";
import { ethers } from "hardhat";

import { Force as ForceContract } from '../typechain-types';
import { EthernautForce as EthernautContract } from '../typechain-types';
import { TriggerEthernautForce as TriggerContract } from '../typechain-types';

import Force from '../artifacts/contracts/Force.sol/Force.json';
import TriggerEthernautForce from '../artifacts/contracts/Force.sol/TriggerEthernautForce.json';
import EthernautForce from '../artifacts/contracts/Force.sol/EthernautForce.json';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { deployContracts } from '../scripts/deploy';

const CONTRACT_NAME = "TriggerEthernautForce";
const CONTRACT_ADDRESS_FORCE = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
const CONTRACT_ADDRESS_ETHERNAUT_FORCE = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';
const CONTRACT_ADDRESS_TRIGGER_FORCE = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';

describe(CONTRACT_NAME, async () => {
  // let deployedContract: TriggerContract;
  let forceContract: ForceContract;
  let ethernautContract: EthernautContract;
  let triggerContract: TriggerContract;
  let owner: SignerWithAddress;
  let sender: SignerWithAddress;
  let randomAddress: SignerWithAddress;
  let txn;

  before(async () => {
      [owner, sender, randomAddress] = await ethers.getSigners();

      // Harhdat Runtime Environment
      const test = true;
      [forceContract, ethernautContract, triggerContract] = await deployContracts(test);

      // Localhost deployed contracts
      // forceContract = await ethers.getContractAt(Force.abi, CONTRACT_ADDRESS_FORCE, owner);
      // ethernautContract = await ethers.getContractAt(EthernautForce.abi, CONTRACT_ADDRESS_ETHERNAUT_FORCE, owner);
      // triggerContract = await ethers.getContractAt(TriggerEthernautForce.abi, CONTRACT_ADDRESS_TRIGGER_FORCE, owner);
    });

  // describe("Force contract", () => {
  //   it("should be reverted with string 'value is zero'", async () => {
  //     // Localhost deployed contracts
  //     //txn = await triggerContract.triggerForce({value: 1});
  //     //await txn.wait();
  //     expect(triggerContract.triggerForce({value: 0})).to.revertedWith('value is zero');
  //   });
    
  //   it("should have a balance greater than 0", async () => {
  //       console.log('INITIAL BALANCES');
  //       console.log(`Force contract: ${(await ethers.provider.getBalance(forceContract.address)).toString()}`);
  //       console.log(`EthernautForce contract: ${(await ethers.provider.getBalance(ethernautContract.address)).toString()}`);
  //       console.log(`TriggerEthernautForce contract: ${(await ethers.provider.getBalance(triggerContract.address)).toString()}`);
  //       console.log(`Owner address: ${(await ethers.provider.getBalance(owner.address)).toString()}`);

  //       // txn = await triggerContract.hello();
  //       // console.log(JSON.stringify(txn, null, 2));
  //       // txn = await owner.sendTransaction({to: forceContract.address, value: ethers.utils.parseEther('0.001'), gasLimit: 200000});
  //       // console.log(txn);

  //       txn = await triggerContract.triggerForce({value: ethers.utils.parseEther('0.001'), gasLimit: 200000});

  //       const newBalance = await ethers.provider.getBalance(forceContract.address);
  //       console.log('CURRENT BALANCES');
  //       console.log(`Force contract: ${newBalance.toString()}`);
  //       console.log(`EthernautForce contract: ${(await ethers.provider.getBalance(ethernautContract.address)).toString()}`);
  //       console.log(`TriggerEthernautForce contract: ${(await ethers.provider.getBalance(triggerContract.address)).toString()}`);
  //       console.log(`Owner address: ${(await ethers.provider.getBalance(owner.address)).toString()}`);

  //       expect(newBalance).to.be.greaterThan(0);
  //     });
  // });
  describe("Force contract", () => {
    it("should be reverted with string 'value is zero'", async () => {
      // Localhost deployed contracts
      //txn = await triggerContract.triggerForce({value: 1});
      //await txn.wait();
      expect(ethernautContract.forceEther({value: 0})).to.revertedWith('value is zero');
    });
    
    it("should have a balance greater than 0", async () => {
        console.log('INITIAL BALANCES');
        console.log(`Force contract: ${(await ethers.provider.getBalance(forceContract.address)).toString()}`);
        console.log(`EthernautForce contract: ${(await ethers.provider.getBalance(ethernautContract.address)).toString()}`);
        // console.log(`TriggerEthernautForce contract: ${(await ethers.provider.getBalance(triggerContract.address)).toString()}`);
        console.log(`Owner address: ${(await ethers.provider.getBalance(owner.address)).toString()}`);

        // txn = await triggerContract.hello();
        // console.log(JSON.stringify(txn, null, 2));
        // txn = await owner.sendTransaction({to: forceContract.address, value: ethers.utils.parseEther('0.001'), gasLimit: 200000});
        // console.log(txn);

        txn = await ethernautContract.forceEther({value: ethers.utils.parseEther('0.001'), gasLimit: 200000});

        const newBalance = await ethers.provider.getBalance(forceContract.address);
        console.log('CURRENT BALANCES');
        console.log(`Force contract: ${newBalance.toString()}`);
        console.log(`EthernautForce contract: ${(await ethers.provider.getBalance(ethernautContract.address)).toString()}`);
        // console.log(`TriggerEthernautForce contract: ${(await ethers.provider.getBalance(triggerContract.address)).toString()}`);
        console.log(`Owner address: ${(await ethers.provider.getBalance(owner.address)).toString()}`);

        expect(newBalance).to.be.greaterThan(0);
      });
  });
});

