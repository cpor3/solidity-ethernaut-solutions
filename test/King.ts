import { expect } from "chai";
import { ethers } from "hardhat";

import { King as KingContract } from '../typechain-types';
import { EthernautKing as EthernautKingContract } from '../typechain-types';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { deployContracts } from '../scripts/deploy';

const CONTRACT_NAME = "EthernautKing";

describe(CONTRACT_NAME, async () => {
  let king: KingContract;
  let ethernautKingContract: EthernautKingContract;
  let owner: SignerWithAddress;
  let sender: SignerWithAddress;
  let randomAddress: SignerWithAddress;
  let txn;

  before(async () => {
      [owner, sender, randomAddress] = await ethers.getSigners();

      // Harhdat Runtime Environment
      const test = true;
      [king, ethernautKingContract] = await deployContracts(test);

      // Localhost deployed contracts
      // forceContract = await ethers.getContractAt(Force.abi, CONTRACT_ADDRESS_FORCE, owner);
      // ethernautContract = await ethers.getContractAt(EthernautForce.abi, CONTRACT_ADDRESS_ETHERNAUT_FORCE, owner);
      // triggerContract = await ethers.getContractAt(TriggerEthernautForce.abi, CONTRACT_ADDRESS_TRIGGER_FORCE, owner);
    });

  describe("King contract", () => {
    it("should change the king forever", async () => {
        console.log(`Owner address: ${(owner.address)}`);
        console.log(`Current King: ${(await king._king())}`);

        txn = await ethernautKingContract.connect(randomAddress).proclamKingForever({value: ethers.utils.parseEther('0.002')});
        await txn.wait();
        console.log(`Current King: ${(await king._king())}`);
        
        txn = {
          from: owner.address,
          to: king.address,
          value: ethers.utils.parseEther('0.002')
        };        

        await expect(owner.sendTransaction(txn)).to.be.revertedWith("Won't let you be the new King");
      });
  });
});

