import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { MockERC721ABurnable__factory, MockERC721ABurnable } from '../../../typechain-types';
import { addHardhatSignersToContext } from '../../../src/utils/introspection/test/contexts/HardhatHelpers';
import { shouldSupportInterfaces } from '../../../src/utils/introspection/test/behaviors/SupportsInterfaces';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'MockERC721ABurnable';

let _testHarnessContractFactory: MockERC721ABurnable__factory;
let _testHarnessInstance: MockERC721ABurnable;

// Start test block
describe(`Basic ERC721A Contract Validation Tests`, function () {
    before(async function () {
        const contractName = TESTHARNESS_CONTRACT_NAME;

        _testHarnessContractFactory = (await hre.ethers.getContractFactory(
            contractName
        )) as MockERC721ABurnable__factory;
    });

    beforeEach(async function () {
        _testHarnessInstance = await _testHarnessContractFactory.deploy();
        await _testHarnessInstance.deployed();

        this.contractUnderTest = _testHarnessInstance;
    });

    addHardhatSignersToContext();

    shouldSupportInterfaces(['ERC165', 'ERC721']);
});
