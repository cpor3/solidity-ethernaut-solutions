import { expect } from "chai";
import { ethers } from "hardhat";

import { Reentrance as ReentrancyContract } from '../typechain-types';
import { EthernautReentrancy as EthernautReentrancyContract } from '../typechain-types';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { deployContracts } from '../scripts/deploy';

const CONTRACT_NAME = "EthernautReentrancy";

describe(CONTRACT_NAME, async () => {
  let reentrancy: ReentrancyContract;
  let ethernautReentrancyContract: EthernautReentrancyContract;
  let owner: SignerWithAddress;
  let sender: SignerWithAddress;
  let randomAddress: SignerWithAddress;
  let txn;

  before(async () => {
      [owner, sender, randomAddress] = await ethers.getSigners();

      const test = true;
      [reentrancy, ethernautReentrancyContract] = await deployContracts(test);
    });

  describe("Reentrancy contract", () => {
    it("should remove all funds", async () => {
        console.log(`Reentrancy balance: ${(await ethers.provider.getBalance(reentrancy.address)).toString()}`);
        console.log(`Ethernaut balance: ${(await ethers.provider.getBalance(ethernautReentrancyContract.address)).toString()}`);

        txn = await reentrancy.connect(randomAddress).donate(randomAddress.address, {value: ethers.utils.parseEther('0.001')});
        await txn.wait();
        console.log(`Reentrancy balance: ${(await ethers.provider.getBalance(reentrancy.address)).toString()}`);
        console.log(`Ethernaut balance: ${(await ethers.provider.getBalance(ethernautReentrancyContract.address)).toString()}`);

        // txn = await ethernautReentrancyContract.connect(randomAddress).withdrawAll({value: ethers.utils.parseEther('0.001')});
        // await txn.wait();

        txn = await ethernautReentrancyContract.connect(owner).donate({value: ethers.utils.parseEther('0.002')});
        await txn.wait();
        console.log(`Reentrancy balance: ${(await ethers.provider.getBalance(reentrancy.address)).toString()}`);
        console.log(`Ethernaut balance: ${(await ethers.provider.getBalance(ethernautReentrancyContract.address)).toString()}`);

        // txn = await ethernautReentrancyContract.withdraw({value: ethers.utils.parseEther('0.001')});
        txn = await ethernautReentrancyContract.connect(owner).withdraw(ethers.utils.parseEther('0.001').toString());
        await txn.wait();
        
        console.log(`Reentrancy balance: ${(await ethers.provider.getBalance(reentrancy.address)).toString()}`);
        console.log(`Ethernaut balance: ${(await ethers.provider.getBalance(ethernautReentrancyContract.address)).toString()}`);

        expect(await ethers.provider.getBalance(reentrancy.address)).to.equal(0);
      });
  });
});

