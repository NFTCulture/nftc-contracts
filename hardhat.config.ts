import dotenv from 'dotenv';
dotenv.config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import { HardhatUserConfig } from 'hardhat/types';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-gas-reporter';

const REPORT_GAS: boolean = (process.env.REPORT_GAS || '').trim() === 'true';
//To enable, run 'npm run test'. Not enabled by default using 'npx hardhat test'.
console.warn(`Include gas summary: ${REPORT_GAS}.`);

const config: HardhatUserConfig = {
    solidity: {
        version: '0.8.17',
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000
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
