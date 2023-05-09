import { ethers } from 'hardhat';
import EthernautTelephone from '../artifacts/contracts/Telephone.sol/EthernautTelephone.json';

const contractAddress = '0x1c168e56c3f237E2DE2f9029bDca87230Cfe9bC4';

async function runTelephone() {
  try {

    const signer = ethers.provider.getSigner();
    const contract = await ethers.getContractAt(EthernautTelephone.abi, contractAddress, signer);
    
    const txn = await contract.safeChangeOwner();
    console.log(`Transaction ${txn.hash} sent to blockchain...`);

    await txn.wait();
    console.log(`Transaction mined`);

  } catch (error) {
    console.error(error);
  }
};

runTelephone().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
