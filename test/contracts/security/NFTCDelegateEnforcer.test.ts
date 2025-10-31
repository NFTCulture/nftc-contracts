import { expect } from 'chai';
import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { addHardhatSignersToContext } from '../../../src';
import {
    MockDelegationRegistry,
    MockDelegationRegistry__factory,
    MockNFTCDelegateEnforcer,
    MockNFTCDelegateEnforcer__factory,
} from '../../../typechain-types';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'MockNFTCDelegateEnforcer';
type testHarnessFactoryType = MockNFTCDelegateEnforcer__factory;
type testHarnessInstanceType = MockNFTCDelegateEnforcer;
let _testFactory: testHarnessFactoryType;
let _testInstance: testHarnessInstanceType;

const DELEGATION_REGISTRY = 'MockDelegationRegistry';
type delegationRegistryFactoryType = MockDelegationRegistry__factory;
type delegationRegistryInstanceType = MockDelegationRegistry;
let _delegationRegistryFactory: delegationRegistryFactoryType;
let _delegationRegistryInstance: delegationRegistryInstanceType;

// Start test block
describe(`File:${__filename}\nContract: ${TESTHARNESS_CONTRACT_NAME}\n`, function () {
    before(async function () {
        const contractName = TESTHARNESS_CONTRACT_NAME;

        _testFactory = (await hre.ethers.getContractFactory(contractName)) as testHarnessFactoryType;

        // Contract doesn't contain state, so safe to do in before.
        _testInstance = await _testFactory.deploy();
        await _testInstance.waitForDeployment();

        _delegationRegistryFactory = (await hre.ethers.getContractFactory(
            DELEGATION_REGISTRY
        )) as delegationRegistryFactoryType;
    });

    beforeEach(async function () {
        // Deploy a fresh MockDelegationRegistry for each test
        _delegationRegistryInstance = await _delegationRegistryFactory.deploy();
        await _delegationRegistryInstance.waitForDeployment();

        // Get the deployed bytecode and place it at the expected delegation registry address
        const DELEGATION_REGISTRY_ADDRESS = '0x00000000000076A84feF008CDAbe6409d2FE638B';
        const code = await hre.ethers.provider.getCode(await _delegationRegistryInstance.getAddress());
        await hre.network.provider.send('hardhat_setCode', [DELEGATION_REGISTRY_ADDRESS, code]);

        // Now connect to the contract at the expected address
        _delegationRegistryInstance = _delegationRegistryFactory.attach(DELEGATION_REGISTRY_ADDRESS) as MockDelegationRegistry;
    });

    addHardhatSignersToContext();

    context('Get Operator From Delegation tests', function () {
        it('MockDelegationRegistry works as expected.', async function () {
            const testInstanceAddress = await _testInstance.getAddress();

            // Configure the mock to return true for this specific delegation
            await _delegationRegistryInstance.setMockDelegation(
                this.addr1.address,
                this.owner.address,
                testInstanceAddress,
                1,
                true
            );

            // Verify it returns the configured value
            expect(
                await _delegationRegistryInstance
                    .connect(this.addr1)
                    .checkDelegateForToken(this.addr1.address, this.owner.address, testInstanceAddress, 1)
            ).to.equal(true);
        });

        it('Get operator returns caller when cold wallet is zero.', async function () {
            const testInstanceAddress = await _testInstance.getAddress();

            // No need to configure mock - default return is false
            // If the delegation registry is called, test should still pass
            // because the function should short-circuit

            const result = await _testInstance.getOperatorFromDelegation(
                this.addr1.address,
                hre.ethers.ZeroAddress,
                testInstanceAddress,
                1
            );

            expect(result).to.equal(this.addr1.address);
        });

        it('Get operator returns caller when cold wallet is same as caller.', async function () {
            const testInstanceAddress = await _testInstance.getAddress();

            const result = await _testInstance.getOperatorFromDelegation(
                this.addr1.address,
                this.addr1.address,
                testInstanceAddress,
                1
            );

            expect(result).to.equal(this.addr1.address);
        });

        it('Get operator returns cold wallet when delegated to addr1.', async function () {
            const testInstanceAddress = await _testInstance.getAddress();

            // Configure mock to return true for valid delegation
            await _delegationRegistryInstance.setMockDelegation(
                this.addr1.address,
                this.owner.address,
                testInstanceAddress,
                1,
                true
            );

            const result = await _testInstance.getOperatorFromDelegation(
                this.addr1.address,
                this.owner.address,
                testInstanceAddress,
                1
            );

            expect(result).to.equal(this.owner.address);
        });

        it('Get operator reverts if delegation is not valid.', async function () {
            const testInstanceAddress = await _testInstance.getAddress();

            // Configure mock - addr1 is delegated, but addr2 is not
            await _delegationRegistryInstance.setMockDelegation(
                this.addr1.address,
                this.owner.address,
                testInstanceAddress,
                1,
                true
            );

            await expect(
                _testInstance.getOperatorFromDelegation(this.addr2.address, this.owner.address, testInstanceAddress, 1)
            ).to.be.revertedWithCustomError(_testInstance, 'NotAuthorizedForDelegation');
        });
    });
});
