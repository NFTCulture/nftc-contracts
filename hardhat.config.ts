import dotenv from 'dotenv';
dotenv.config(); // console.log(process.env);
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

/**
 * Custom compiler configuration (currently disabled).
 * To use a cached compiler for CI/CD, uncomment the subtask below and add imports:
 * import { resolve } from 'path';
 * import { TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD } from 'hardhat/builtin-tasks/task-names';
 * import { subtask } from 'hardhat/config';
 */
// subtask<{ solcVersion: string }>(TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD, async (args, _, next) => {
//     if (args.solcVersion === '0.8.30') {
//       const compilerPath = resolve(__dirname, '.solc_cache/soljson-v0.8.30+commit.28d00a2f.js');
//
//       return {
//         compilerPath,
//         isSolcJs: true,
//         version: args.solcVersion,
//         longVersion: '0.8.30+commit.28d00a2f'
//       };
//     }
//     else {
//         console.error(`Error: Solidity version ${args.solcVersion} is not supported for direct download via Github workflow actions. Please ensure a cached version is listed in your configuration.`);
//     }
//
//     return next();
//   });

const REPORT_GAS: boolean = (process.env.REPORT_GAS || '').trim() === 'true';
//To enable, run 'npm run test:gas'. Not enabled by default using 'npx hardhat test'.
console.warn(`Include gas summary: ${REPORT_GAS}.`);

const config: HardhatUserConfig = {
    solidity: {
        version: '0.8.30',
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
        currency: 'USD',
        gasPrice: 100
    }
};

export default config;
