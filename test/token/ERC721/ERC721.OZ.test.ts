import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { MockERC721_OZ__factory, MockERC721_OZ } from '../../../typechain-types';
import { shouldCopyHardhatWalletsToContext } from '../../../src/utils/introspection/test/HardhatWalletsToContext.behavior';
import { shouldSupportInterfaces } from '../../../src/utils/introspection/test/SupportsInterfaces.behavior';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'MockERC721_OZ';

let _testHarnessContractFactory: MockERC721_OZ__factory;
let _testHarnessInstance: MockERC721_OZ;

// Start test block
describe(`${TESTHARNESS_CONTRACT_NAME} Unit Tests`, function () {
    before(async function () {
        const contractName = TESTHARNESS_CONTRACT_NAME;

        _testHarnessContractFactory = (await hre.ethers.getContractFactory(contractName)) as MockERC721_OZ__factory;
    });

    beforeEach(async function () {
        _testHarnessInstance = await _testHarnessContractFactory.deploy();
        await _testHarnessInstance.deployed();

        this.mockInstance = _testHarnessInstance;
    });

    shouldCopyHardhatWalletsToContext();

    context('Test Group 1', function () {
        it('Test Case 1', async function () {
            console.log('Init Tests');
        });
    });

    shouldSupportInterfaces(['ERC165', 'ERC721']);
});
