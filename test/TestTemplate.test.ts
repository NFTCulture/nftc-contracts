import * as dotenv from 'dotenv';
import hre from 'hardhat';
import { TemplateTestHarness__factory, TemplateTestHarness } from '../typechain-types';
import { shouldCopyHardhatWalletsToContext } from '../src/utils/introspection/test/HardhatWalletsToContext.behavior';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'TemplateTestHarness';

let _testHarnessContractFactory: TemplateTestHarness__factory;
let _testHarnessInstance: TemplateTestHarness;

describe(`${TESTHARNESS_CONTRACT_NAME} Unit Tests`, function () {
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

    shouldCopyHardhatWalletsToContext();

    context('Test Group 1', function () {
        it('Test Case 1', async function () {
            console.log('Init Tests');
        });
    });
});
