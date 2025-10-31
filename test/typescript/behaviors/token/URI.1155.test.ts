import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { addHardhatSignersToContext, shouldDefine1155URI } from '../../../../src';
import { MockERC1155ConfigurableURI, MockERC1155ConfigurableURI__factory } from '../../../../typechain-types';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'MockERC1155ConfigurableURI';

let _testHarnessContractFactory: MockERC1155ConfigurableURI__factory;
let _testHarnessInstance: MockERC1155ConfigurableURI;

// Some plausibly real ERC1155 URI
const ERC1155URI = 'https://nftculture.mypinata.com/ipfs/Qm000abcdefghijkl/{id}.json';

// Start test block
describe(`File:${__filename}\nContract: ${TESTHARNESS_CONTRACT_NAME}\n`, function () {
    before(async function () {
        _testHarnessContractFactory = await hre.ethers.getContractFactory(TESTHARNESS_CONTRACT_NAME);
    });

    beforeEach(async function () {
        _testHarnessInstance = await _testHarnessContractFactory.deploy(ERC1155URI);
        await _testHarnessInstance.waitForDeployment();
        this.contractUnderTest = _testHarnessInstance;
    });

    addHardhatSignersToContext();

    shouldDefine1155URI(TESTHARNESS_CONTRACT_NAME, async () => ERC1155URI);
});
