import { expect } from 'chai';
import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { addHardhatSignersToContext } from '../../src/for-tests/context/HardhatHelpers';
import { TemplateTestHarness, TemplateTestHarness__factory } from '../../typechain-types';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'TemplateTestHarness';

let _testHarnessContractFactory: TemplateTestHarness__factory;
let _testHarnessInstance: TemplateTestHarness;

describe(`File:${__filename}\nContract: ${TESTHARNESS_CONTRACT_NAME}\n`, function () {
    before(async function () {
        const contractName = TESTHARNESS_CONTRACT_NAME;

        _testHarnessContractFactory = (await hre.ethers.getContractFactory(
            contractName
        )) as TemplateTestHarness__factory;
    });

    beforeEach(async function () {
        _testHarnessInstance = await _testHarnessContractFactory.deploy();
        await _testHarnessInstance.deployed();
    });

    addHardhatSignersToContext();

    context('Test Group 1', function () {
        it('Test Case 1', async function () {
            expect(true).to.be.equal(true);
        });
    });
});
