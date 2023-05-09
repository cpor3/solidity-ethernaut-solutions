import { ethers } from 'hardhat';
import EthernautKing from '../artifacts/contracts/King.sol/EthernautKing.json';

const contractAddress = '0x99cFc078d086a22Eb434933B362e98F1C2ad1a4f';

async function runKing() {
  try {

    const signer = ethers.provider.getSigner();
    const contract = await ethers.getContractAt(EthernautKing.abi, contractAddress, signer);
    
    const txn = await contract.proclamKingForever({value: ethers.utils.parseEther('0.001'), gasLimit: 200000});
    console.log(`Transaction ${txn.hash} sent to blockchain...`);

    await txn.wait();
    console.log(`Transaction mined`);

  } catch (error) {
    console.error(error);
  }
};

runKing().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

