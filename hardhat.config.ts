import dotenv from 'dotenv';
dotenv.config(); // console.log(process.env);
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const REPORT_GAS: boolean = (process.env.REPORT_GAS || '').trim() === 'true';
//To enable, run 'npm run test:gas'. Not enabled by default using 'npx hardhat test'.
console.warn(`Include gas summary: ${REPORT_GAS}.`);

const config: HardhatUserConfig = {
    solidity: {
        version: '0.8.21',
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000
            },
            outputSelection: {
                '*': {
                    '*': ['storageLayout']
                }
            }
        }
    },
    gasReporter: {
        enabled: REPORT_GAS,
        showTimeSpent: true,
        currency: 'USD',
        gasPrice: 100
    }
};

export default config;
