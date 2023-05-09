import { ethers } from 'hardhat';
import EthernautForce from '../artifacts/contracts/Force.sol/EthernautForce.json';

const contractAddress = '0xbd573aBCc16eCE5526b87795c2E6Ab3AB488B9F7';

async function runForce() {
  try {
    
    const signer = ethers.provider.getSigner();
    const contract = await ethers.getContractAt(EthernautForce.abi, contractAddress, signer);
    
    const txn = await contract.forceEther({value: ethers.utils.parseEther('0.001'), gasLimit: 200000});
    console.log(`Transaction ${txn.hash} sent to blockchain...`);

    await txn.wait();
    console.log(`Transaction mined`);

  } catch (error) {
    console.error(error);
  }
};

runForce().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

