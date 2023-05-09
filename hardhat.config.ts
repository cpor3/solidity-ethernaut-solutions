import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';

dotenv.config({path: './.env'});

const PRE_FUNDED_PRIVATE_KEY_1 = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

const config: HardhatUserConfig = {
  // solidity: "0.8.17",
  solidity: {
    compilers: [
      {
        version: "0.8.17",
      },
      {
        version: "0.6.0",
      },
      {
        version: "0.6.12",
      }
    ]
  },
  networks: {
    goerli: {
      url: process.env.NODE_PROVIDER_URL,
      accounts: [process.env.PRIVATE_KEY ?? '']
    },
    // Harhdhat localhost
    localhost: {
      chainId: 31337, 
      accounts: [`${PRE_FUNDED_PRIVATE_KEY_1}`],
    }    
  }
};

export default config;
