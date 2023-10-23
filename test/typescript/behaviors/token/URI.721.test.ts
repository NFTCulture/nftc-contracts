import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { addHardhatSignersToContext, shouldDefineBaseURI } from '../../../../src';
import { MockERC721SolBase, MockERC721SolBase__factory } from '../../../../typechain-types';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'MockERC721SolBase';

let _testHarnessContractFactory: MockERC721SolBase__factory;
let _testHarnessInstance: MockERC721SolBase;

// Some plausibly real ERC721 baseURI
const ERC721BaseURI = 'https://nftculture.mypinata.cloud/ipfs/Qm000abcdefghijkl/';

// Start test block
describe(`${TESTHARNESS_CONTRACT_NAME} Unit Tests`, function () {
    before(async function () {
        _testHarnessContractFactory = await hre.ethers.getContractFactory(TESTHARNESS_CONTRACT_NAME);
    });

    beforeEach(async function () {
        _testHarnessInstance = await _testHarnessContractFactory.deploy(ERC721BaseURI);
        await _testHarnessInstance.deployed();
        this.contractUnderTest = _testHarnessInstance;
    });

    addHardhatSignersToContext();

    shouldDefineBaseURI(TESTHARNESS_CONTRACT_NAME, async () => ERC721BaseURI);
});
