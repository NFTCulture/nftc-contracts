import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { MockERC721OZ__factory, MockERC721OZ } from '../../../typechain-types';
import { addHardhatSignersToContext } from '../../../src/utils/introspection/test/contexts/HardhatHelpers';
import { shouldSupportInterfaces } from '../../../src/utils/introspection/test/behaviors/SupportsInterfaces';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'MockERC721OZ';

let _testHarnessContractFactory: MockERC721OZ__factory;
let _testHarnessInstance: MockERC721OZ;

// Start test block
describe(`Basic ERC721OZ Contract Validation Tests`, function () {
    before(async function () {
        const contractName = TESTHARNESS_CONTRACT_NAME;

        _testHarnessContractFactory = (await hre.ethers.getContractFactory(contractName)) as MockERC721OZ__factory;
    });

    beforeEach(async function () {
        _testHarnessInstance = await _testHarnessContractFactory.deploy();
        await _testHarnessInstance.deployed();

        this.contractUnderTest = _testHarnessInstance;
    });

    addHardhatSignersToContext();

    shouldSupportInterfaces(['ERC165', 'ERC721']);
});
