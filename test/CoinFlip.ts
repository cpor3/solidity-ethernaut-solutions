import { expect } from "chai";
import { ethers } from "hardhat";
import { EthernautCoinFlip } from '../typechain-types';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

const CONTRACT_NAME = "EthernautCoinFlip";

describe(CONTRACT_NAME, async () => {
  let deployedContract: EthernautCoinFlip;
  let owner: SignerWithAddress;
  let randomAddress: SignerWithAddress;

  before(async () => {
      [, owner, randomAddress] = await ethers.getSigners();
      const ContractFactory = await ethers.getContractFactory(CONTRACT_NAME);
      deployedContract = await ContractFactory.deploy('0x0165878A594ca255338adfa4d48449f69242Eb8F');
      await deployedContract.deployed();
      const result = await deployedContract.safeFlip();
      console.log(result);
  });

  describe("flip", () => {
      it("should not reject", async () => {
        const result = await deployedContract.safeFlip();
        // expect(result).to.equal(true);
      });
  });
});

