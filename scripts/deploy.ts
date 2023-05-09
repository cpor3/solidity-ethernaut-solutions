import { ethers } from "hardhat";

// Lazy approach, better use a Hardhat task 
enum Levels {
  CoinFlip = 'cf',
  Telephone = 'tf',
  Token = 'tk', 
  Force = 'fc', 
  DelegateCall = 'dc',
  King = 'kg',
  Reentrancy = 're'
}

// CONTRACT TO DEPLOY
const level = Levels.CoinFlip;

export async function deployContracts(test?: boolean) {
  switch (level.toString()) {
    case Levels.CoinFlip:
      return await coinFlip(test);
      break;
    case Levels.Telephone:
      return await telephone(test);
      break;
    case Levels.Token:
      return await Token(test);
      break;
    case Levels.Force:
      return await Force(test);
      break;
    case Levels.DelegateCall:
      return await DelegateCall(test);
      break;
    case Levels.King:
      return await King(test);
      break;
    case Levels.Reentrancy:
      return await Reentrancy(test);
      break;

    default:
      console.error('No such level');
  }
}   

async function coinFlip(test?: boolean) {
  //// CoinFlip
  // DeployedInstance
  const DeployedInstance = await ethers.getContractFactory("DeployedInstance");
  const deployedInstance = await DeployedInstance.deploy();
  await deployedInstance.deployed();
  console.log(`DeployedInstance deployed to ${deployedInstance.address}`);
  // CoinFlip
  const CoinFlip = await ethers.getContractFactory("EthernautCoinFlip");
  const coinFlip = await CoinFlip.deploy('0xFE86bAB0D635acf543e83437eD1aF0FB2a14aE98');
  // const coinFlip = await CoinFlip.deploy(deployedInstance.address);
  await coinFlip.deployed();
  console.log(`CoinFlip deployed to ${coinFlip.address}`);

  return [deployedInstance, coinFlip];
}

async function telephone(test?: boolean) {
  //// Telephone
  const Telephone = await ethers.getContractFactory("EthernautTelephone");
  const telephone = await Telephone.deploy('0x1c168e56c3f237E2DE2f9029bDca87230Cfe9bC4', '0xf5a9470EDB0e0030377f905370A06A9Af99aA999');
  await telephone.deployed();
  console.log(`Telephone deployed to ${telephone.address}`);  

  return [telephone];
}

async function Token(test?: boolean) {
  //// Token
  const Token = await ethers.getContractFactory("EthernautToken");
  const token = await Token.deploy(21000000);
  await token.deployed();
  console.log(`Token deployed to ${token.address}`);  

  return [token];
}

async function Force(test?: boolean) {
  //// Force
  let force: any;
  if (test) {
    const Force = await ethers.getContractFactory("Force");
    force = await Force.deploy();
    await force.deployed();
    console.log(`Force deployed to ${force.address}`);  
  } else {
    force = {
      address: '0x2b310F0E4a3Ea8f703533bC13e0b4F37FC5Cda01'
    }
  }
  const EthernautForce = await ethers.getContractFactory("EthernautForce");
  const ethernautForce = await EthernautForce.deploy(force.address, {value: ethers.utils.parseEther('0.002')});
  await ethernautForce.deployed();
  console.log(`EthernautForce deployed to ${ethernautForce.address}`);  

  // const TriggerEthernautForce = await ethers.getContractFactory("TriggerEthernautForce");
  // const triggerEthernautForce = await TriggerEthernautForce.deploy(ethernautForce.address, {value: ethers.utils.parseEther('0.002')});
  // await triggerEthernautForce.deployed();
  // console.log(`TriggerForce deployed to ${triggerEthernautForce.address}`);  

  // return [force, ethernautForce, triggerEthernautForce];
  return [force, ethernautForce];
}

async function DelegateCall(test?: boolean) {  
  //// DelegateCall
  const Delegate = await ethers.getContractFactory("Delegate");
  const delegate = await Delegate.deploy();
  await delegate.deployed();
  console.log(`delegate deployed to ${delegate.address}`);

  const Delegation = await ethers.getContractFactory("Delegation");
  const delegation = await Delegation.deploy(delegate.address);
  await delegation.deployed();
  console.log(`delegation deployed to ${delegation.address}`);

  const TriggerDelegation = await ethers.getContractFactory("TriggerDelegation");
  const triggerDelegation = await TriggerDelegation.deploy();
  await triggerDelegation.deployed();
  console.log(`triggerDelegation deployed to ${triggerDelegation.address}`);

  return [delegate, delegation, triggerDelegation];
}

async function King(test?: boolean) {
  //// King
  let king: any;
  if (test) {
    const King = await ethers.getContractFactory("King");
    king = await King.deploy();
    await king.deployed();
    console.log(`king deployed to ${king.address}`);  
  } else {
    king = {
      address: '0xa3C925481a1eE95df99664E1E9e0D3b217e96D4F'
    }
  }

  const EthernautKingContract = await ethers.getContractFactory("EthernautKing");
  const ethernautKingContract = await EthernautKingContract.deploy(king.address);
  await ethernautKingContract.deployed();
  console.log(`ethernautKingContract deployed to ${ethernautKingContract.address}`);

  return [king, ethernautKingContract];
}

async function Reentrancy(test?: boolean) {
  //// Reentrancy
  let reentrancy: any;
  if (test) {
    const Reentrancy = await ethers.getContractFactory("Reentrance");
    reentrancy = await Reentrancy.deploy();
    await reentrancy.deployed();
    console.log(`Reentrancy deployed to ${reentrancy.address}`);  
  } else {
    reentrancy = {
      address: '0x8aDcC7095224a8aF8125ac563B491FFec6013dD0'
    }
  }

  const EthernautReentrancyContract = await ethers.getContractFactory("EthernautReentrancy");
  const ethernautReentrancyContract = await EthernautReentrancyContract.deploy(reentrancy.address);
  await ethernautReentrancyContract.deployed();
  console.log(`EthernautReentrancyContract deployed to ${ethernautReentrancyContract.address}`);

  return [reentrancy, ethernautReentrancyContract];
}


