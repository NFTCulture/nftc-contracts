import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { shouldSupportInterfaces } from '../../../src/utils/introspection/test/behaviors/SupportsInterfaces';
import { addHardhatSignersToContext } from '../../../src/utils/introspection/test/contexts/HardhatHelpers';
import { MockERC721OZ, MockERC721OZ__factory } from '../../../typechain-types';

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

    shouldSupportInterfaces(TESTHARNESS_CONTRACT_NAME, ['ERC165', 'ERC721', 'ERC721Metadata']);
});
