import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { addHardhatSignersToContext } from '../../../../src';
import { shouldDefineBaseURI } from '../../../../src/behaviors/token/URI';
import { MockERC721SolBase, MockERC721SolBase__factory } from '../../../../typechain-types';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'MockERC721SolBase';

let _testHarnessContractFactory: MockERC721SolBase__factory;
let _testHarnessInstance: MockERC721SolBase;

// Start test block
describe(`${TESTHARNESS_CONTRACT_NAME} Unit Tests`, function () {
    before(async function () {
        _testHarnessContractFactory = await hre.ethers.getContractFactory(TESTHARNESS_CONTRACT_NAME);
    });

    beforeEach(async function () {
        _testHarnessInstance = await _testHarnessContractFactory.deploy(
            'https://nftculture.mypinata.cloud/ipfs/Qm000abcdefghijkl/'
        );
        await _testHarnessInstance.deployed();
        this.contractUnderTest = _testHarnessInstance;
    });

    addHardhatSignersToContext();

    shouldDefineBaseURI(
        TESTHARNESS_CONTRACT_NAME,
        async () => 'https://nftculture.mypinata.cloud/ipfs/Qm000abcdefghijkl/' // Some plausibly real baseURI
    );
});
