import { ethers } from 'hardhat';
import TriggerEthernautForce from '../artifacts/contracts/Force.sol/TriggerEthernautForce.json';

const contractAddress = '0xffdfc105710598ad07f44dd8685a01861d7fda36';

async function runTriggerForce() {
  try {

    const signer = ethers.provider.getSigner();
    const contract = await ethers.getContractAt(TriggerEthernautForce.abi, contractAddress, signer);
    
    const txn = await contract.triggerForce({value: ethers.utils.parseEther('0.001'), gasLimit: 200000});
    console.log(`Transaction ${txn.hash} sent to blockchain...`);

    await txn.wait();
    console.log(`Transaction mined`);

  } catch (error) {
    console.error(error);
  }
};

runTriggerForce().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

