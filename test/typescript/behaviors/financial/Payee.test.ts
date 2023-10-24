import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { addHardhatSignersToContext, getDefaultHardhatAddresses, shouldDefinePayees } from '../../../../src';
import { NFTCSplitsAndRoyaltiesMock, NFTCSplitsAndRoyaltiesMock__factory } from '../../../../typechain-types';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'NFTCSplitsAndRoyaltiesMock';

let _testFactory: NFTCSplitsAndRoyaltiesMock__factory;
let _testInstance: NFTCSplitsAndRoyaltiesMock;

// Start test block
describe(`File:${__filename}\nContract: ${TESTHARNESS_CONTRACT_NAME}\n`, function () {
    before(async function () {
        const contractName = TESTHARNESS_CONTRACT_NAME;

        _testFactory = await hre.ethers.getContractFactory(contractName);
    });

    beforeEach(async function () {
        const addresses = await getDefaultHardhatAddresses();
        const splits = [90, 5, 5];
        const aLargePayment = {
            value: hre.ethers.utils.parseEther('100')
        };

        _testInstance = await _testFactory.deploy(addresses, splits, aLargePayment);
        await _testInstance.deployed();

        this.contractUnderTest = _testInstance;
    });

    addHardhatSignersToContext();

    shouldDefinePayees(TESTHARNESS_CONTRACT_NAME, async () => await getDefaultHardhatAddresses());
});
