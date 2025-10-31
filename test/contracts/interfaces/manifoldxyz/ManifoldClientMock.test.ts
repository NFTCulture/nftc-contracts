import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { shouldSupportInterfaces } from '../../../../src/behaviors/utility/introspection/SupportsInterfaces';
import { addHardhatSignersToContext } from '../../../../src/for-tests/context/HardhatHelpers';
import { ManifoldClientMock, ManifoldClientMock__factory } from '../../../../typechain-types';
import { shouldSupportInterfacesManifold } from '../../../../src/behaviors/utility/introspection/SupportsInterfacesManifold';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'ManifoldClientMock';

let _testHarnessContractFactory: ManifoldClientMock__factory;
let _testHarnessInstance: ManifoldClientMock;

// Start test block
describe(`File:${__filename}\nContract: ${TESTHARNESS_CONTRACT_NAME}\n`, function () {
    before(async function () {
        _testHarnessContractFactory = (await hre.ethers.getContractFactory(
            TESTHARNESS_CONTRACT_NAME
        )) as ManifoldClientMock__factory;
    });

    beforeEach(async function () {
        _testHarnessInstance = await _testHarnessContractFactory.deploy();
        await _testHarnessInstance.waitForDeployment();

        this.contractUnderTest = _testHarnessInstance;
    });

    addHardhatSignersToContext();

    shouldSupportInterfaces(TESTHARNESS_CONTRACT_NAME, ['ERC165']);

    shouldSupportInterfacesManifold(TESTHARNESS_CONTRACT_NAME, ['LazyDelivery', 'LazyDeliveryMetadata', 'PriceEngine']);
});
