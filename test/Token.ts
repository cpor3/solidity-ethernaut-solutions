import { expect } from "chai";
import { ethers } from "hardhat";
import { EthernautToken } from '../typechain-types';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

const CONTRACT_NAME = "EthernautToken";

describe(CONTRACT_NAME, async () => {
  let deployedContract: EthernautToken;
  let owner: SignerWithAddress;
  let sender: SignerWithAddress;
  let randomAddress: SignerWithAddress;
  let txn;

  before(async () => {
      [owner, sender, randomAddress] = await ethers.getSigners();
      const ContractFactory = await ethers.getContractFactory(CONTRACT_NAME);
      deployedContract = await ContractFactory.deploy(21000000);
      await deployedContract.deployed();
  });

  describe("flip", () => {
      it("should transfer 2 tokens", async () => {
        txn = await deployedContract.transfer(sender.address, 20);
        await txn.wait();
        console.log(`Transfer done`);

        console.log(`Owner balance: ${await deployedContract.balanceOf(owner.address)}`);
        console.log(`Sender balance: ${await deployedContract.balanceOf(sender.address)}`);
        console.log(`Random user balance: ${await deployedContract.balanceOf(randomAddress.address)}`);

        txn = await deployedContract.connect(sender).transfer(owner.address, 21);
        await txn.wait();
        console.log(`Transfer done`);

        console.log(`Owner balance: ${await deployedContract.balanceOf(owner.address)}`);
        console.log(`Sender balance: ${await deployedContract.balanceOf(sender.address)}`);
        console.log(`Random user balance: ${await deployedContract.balanceOf(randomAddress.address)}`);

        txn = await deployedContract.connect(sender).transfer(owner.address, 1);
        await txn.wait();
        console.log(`Transfer done`);

        console.log(`Owner balance: ${await deployedContract.balanceOf(owner.address)}`);
        console.log(`Sender balance: ${await deployedContract.balanceOf(sender.address)}`);
        console.log(`Random user balance: ${await deployedContract.balanceOf(randomAddress.address)}`);

        expect(await deployedContract.balanceOf(randomAddress.address)).to.equal(2);
      });
  });
});

