# Ethernaut solutions

As described in its [website](https://ethernaut.openzeppelin.com/), **The Ethernaut** is a Web3/Solidity based wargame inspired by overthewire.org, played in the Ethereum Virtual Machine. Each level is a smart contract that needs to be 'hacked'. 

This repo has a collection of some **Solidity** solutions to a few Ethernaut levels.

With each level, the solution is first tested and then deployed. Once deployed, a run script for each level triggers the 'attack'.

## Configuration
The environment used for writing the solutions involves Hardhat, and uses an Alchemy node and a Metamask wallet for deploying to the Goerli network. 

In order to run the solutions, you will need an Alchemy API key and your Metamask private key.

These are to be stored in the `.env` file:
```
# Alchemy
NODE_PROVIDER_URL = https://eth-goerli.g.alchemy.com/v2/...

# Metamask
PRIVATE_KEY = 
```

## Levels
| # | Level | Test | Run attack on Goerli |
|----|----|----|----|
| 03 | Coin Flip |`npm run test-coinFlip` |  |
| 04 | Telephone | | |
| 05 | Token | `npm run test-token` | |
| 06 | Delegation | `npm run test-delegateCall` | |
| 07 | Force | `npm run test-force` | `npm run triggerForce` |
| 09 | King | `npm run test-king` | `npm run king` |
| 10 | Re-entrancy | `npm run test-reentrancy` | `npm run reentrancy` |

## Deployments
First select the appropiate contract in `scripts/deploy.ts`, then run:

To deploy on localhost:
```
npm run deploy
```

To deploy on Goerli network:
```
npm run deploy_blockchain
```
