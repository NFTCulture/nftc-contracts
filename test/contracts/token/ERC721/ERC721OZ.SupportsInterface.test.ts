import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { shouldSupportInterfaces } from '../../../../src/behaviors/utility/introspection/SupportsInterfaces';
import { addHardhatSignersToContext } from '../../../../src/for-tests/context/HardhatHelpers';
import { MockERC721OZ, MockERC721OZ__factory } from '../../../../typechain-types';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'MockERC721OZ';

let _testHarnessContractFactory: MockERC721OZ__factory;
let _testHarnessInstance: MockERC721OZ;

// Start test block
describe(`File:${__filename}\nContract: ${TESTHARNESS_CONTRACT_NAME}\n`, function () {
    before(async function () {
        _testHarnessContractFactory = (await hre.ethers.getContractFactory(
            TESTHARNESS_CONTRACT_NAME
        )) as MockERC721OZ__factory;
    });

    beforeEach(async function () {
        _testHarnessInstance = await _testHarnessContractFactory.deploy();
        await _testHarnessInstance.waitForDeployment();

        this.contractUnderTest = _testHarnessInstance;
    });

    addHardhatSignersToContext();

    shouldSupportInterfaces(TESTHARNESS_CONTRACT_NAME, ['ERC165', 'ERC721', 'ERC721Metadata']);
});
