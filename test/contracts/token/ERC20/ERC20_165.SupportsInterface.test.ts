import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { shouldSupportInterfaces } from '../../../../src/behaviors/utility/introspection/SupportsInterfaces';
import { addHardhatSignersToContext } from '../../../../src/for-tests/context/HardhatHelpers';
import { MockERC20_165, MockERC20_165__factory } from '../../../../typechain-types';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'MockERC20_165';

let _testHarnessContractFactory: MockERC20_165__factory;
let _testHarnessInstance: MockERC20_165;

// Start test block
describe(`File:${__filename}\nContract: ${TESTHARNESS_CONTRACT_NAME}\n`, function () {
    before(async function () {
        _testHarnessContractFactory = (await hre.ethers.getContractFactory(
            TESTHARNESS_CONTRACT_NAME
        )) as MockERC20_165__factory;
    });

    beforeEach(async function () {
        _testHarnessInstance = await _testHarnessContractFactory.deploy();
        await _testHarnessInstance.deployed();

        this.contractUnderTest = _testHarnessInstance;
    });

    addHardhatSignersToContext();

    shouldSupportInterfaces(TESTHARNESS_CONTRACT_NAME, ['ERC165', 'ERC20', 'ERC20Metadata']);
});
