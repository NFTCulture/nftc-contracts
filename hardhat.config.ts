/**
 * @type import('hardhat/config').HardhatUserConfig
 */

import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-gas-reporter'

import { HardhatUserConfig } from 'hardhat/types';

const REPORT_GAS: string = process.env.REPORT_GAS || '';
if (REPORT_GAS === 'true') {
    console.log('Enabling gas summary');
    // TODO
}

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
        currency: 'USD',
        gasPrice: 100,
        showTimeSpent: true
    }
};

export default config;