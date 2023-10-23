import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { shouldSupportInterfaces } from '../../../../src/behaviors/utility/introspection/SupportsInterfaces';
import { addHardhatSignersToContext } from '../../../../src/for-tests/context/HardhatHelpers';
import { MockERC721SolBase, MockERC721SolBase__factory } from '../../../../typechain-types';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'MockERC721SolBase';

let _testHarnessContractFactory: MockERC721SolBase__factory;
let _testHarnessInstance: MockERC721SolBase;

// Start test block
describe(`Basic ERC721SolBase Contract Validation Tests`, function () {
    before(async function () {
        _testHarnessContractFactory = (await hre.ethers.getContractFactory(
            TESTHARNESS_CONTRACT_NAME
        )) as MockERC721SolBase__factory;
    });

    beforeEach(async function () {
        _testHarnessInstance = await _testHarnessContractFactory.deploy('https://gateway.pinata.cloud/ipfs/');
        await _testHarnessInstance.deployed();

        this.contractUnderTest = _testHarnessInstance;
    });

    addHardhatSignersToContext();

    shouldSupportInterfaces(TESTHARNESS_CONTRACT_NAME, ['ERC165', 'ERC721', 'ERC721Metadata']);
});
