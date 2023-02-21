import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { Contract } from '@ethersproject/contracts';

import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import type * as ethers from 'ethers';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'TemplateTestHarness';

let _testHarnessContractFactory: ethers.ContractFactory;
let _testHarnessInstance: Contract;

let _owner: SignerWithAddress;

// Start test block
describe(`${TESTHARNESS_CONTRACT_NAME} Unit Tests`, function () {
    before(async function () {
        const contractName = TESTHARNESS_CONTRACT_NAME;

        _testHarnessContractFactory = await hre.ethers.getContractFactory(contractName);
    });

    beforeEach(async function () {
        const [owner, addr1, addr2, addr3, ...addrs] = await hre.ethers.getSigners();

        _owner = owner;

        _testHarnessInstance = await _testHarnessContractFactory.deploy(
            // No Args
        );

        await _testHarnessInstance.deployed();
    });

    context('Test Group 1', function () {
        it('Test Case 1', async function () {
            console.log("Init Tests");
        });
    });
});