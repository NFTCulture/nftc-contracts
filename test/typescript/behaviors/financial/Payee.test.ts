import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { addHardhatSignersToContext, getDefaultHardhatAddresses, shouldDefinePayees } from '../../../../src';
import { NFTCSplitsAndRoyaltiesMock, NFTCSplitsAndRoyaltiesMock__factory } from '../../../../typechain-types';

dotenv.config();

const CONTRACT_NAME = 'NFTCSplitsAndRoyaltiesMock';

let _testFactory: NFTCSplitsAndRoyaltiesMock__factory;
let _testInstance: NFTCSplitsAndRoyaltiesMock;

// Start test block
describe(`${CONTRACT_NAME} Unit Tests`, function () {
    before(async function () {
        const contractName = CONTRACT_NAME;

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

    shouldDefinePayees(CONTRACT_NAME, async () => await getDefaultHardhatAddresses());
});
