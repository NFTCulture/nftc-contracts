import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { MockERC721SolBase__factory, MockERC721SolBase } from '../../../typechain-types';
import { addHardhatSignersToContext } from '../../../src/utils/introspection/test/contexts/HardhatHelpers';
import { shouldSupportInterfaces } from '../../../src/utils/introspection/test/behaviors/SupportsInterfaces';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'MockERC721SolBase';

let _testHarnessContractFactory: MockERC721SolBase__factory;
let _testHarnessInstance: MockERC721SolBase;

// Start test block
describe(`Basic ERC721SolBase Contract Validation Tests`, function () {
    before(async function () {
        const contractName = TESTHARNESS_CONTRACT_NAME;

        _testHarnessContractFactory = (await hre.ethers.getContractFactory(contractName)) as MockERC721SolBase__factory;
    });

    beforeEach(async function () {
        _testHarnessInstance = await _testHarnessContractFactory.deploy('https://gateway.pinata.cloud/ipfs/');
        await _testHarnessInstance.deployed();

        this.contractUnderTest = _testHarnessInstance;
    });

    addHardhatSignersToContext();

    shouldSupportInterfaces(['ERC165', 'ERC721']);
});
