import { FakeContract, smock } from '@defi-wonderland/smock';
import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import chai, { expect } from 'chai';
import * as dotenv from 'dotenv';
import hre from 'hardhat';

import {
    MockDelegationRegistry,
    MockDelegationRegistry__factory,
    MockNFTCDelegateEnforcer,
    MockNFTCDelegateEnforcer__factory,
} from '../../typechain-types';

dotenv.config();

// Needed to make sure that called() and calledOnce assertions work.
chai.should();
chai.use(smock.matchers);

const CONTRACT_NAME = 'MockNFTCDelegateEnforcer';
type testHarnessFactoryType = MockNFTCDelegateEnforcer__factory;
type testHarnessInstanceType = MockNFTCDelegateEnforcer;
let _testFactory: testHarnessFactoryType;
let _testInstance: testHarnessInstanceType;

const DELEGATION_REGISTRY = 'MockDelegationRegistry';
const DELEGATION_REGISTRY_ADDRESS = '0x00000000000076A84feF008CDAbe6409d2FE638B';
type delegationRegistryFactoryType = MockDelegationRegistry__factory;
type delegationRegistryInstanceType = MockDelegationRegistry;
let _delegationRegistryFactory: delegationRegistryFactoryType;
let _fakeDelegationRegistryInstance: FakeContract<delegationRegistryInstanceType>;

let _owner: SignerWithAddress;
let _addr1: SignerWithAddress;
let _addr2: SignerWithAddress;

// Start test block
describe(`${CONTRACT_NAME} Unit Tests`, function () {
    before(async function () {
        const contractName = CONTRACT_NAME;

        _testFactory = (await hre.ethers.getContractFactory(contractName)) as testHarnessFactoryType;

        // Contract doesn't contain state, so safe to do in before.
        _testInstance = await _testFactory.deploy();
        await _testInstance.deployed();

        _delegationRegistryFactory = (await hre.ethers.getContractFactory(
            DELEGATION_REGISTRY
        )) as delegationRegistryFactoryType;
    });

    beforeEach(async function () {
        const [owner, addr1, addr2, addr3, ...addrs] = await hre.ethers.getSigners();

        _owner = owner;
        _addr1 = addr1;
        _addr2 = addr2;

        // Put this in the before each, so the fake call counter resets.
        _fakeDelegationRegistryInstance = await smock.fake<delegationRegistryInstanceType>(_delegationRegistryFactory, {
            address: DELEGATION_REGISTRY_ADDRESS
        });
    });

    context('Get Operator From Delegation tests', function () {
        it('Delegation Registry mocks work as expected.', async function () {
            _fakeDelegationRegistryInstance.checkDelegateForToken
                .whenCalledWith(_addr1.address, _owner.address, _testInstance.address, 1)
                .returns(true);

            expect(
                await _fakeDelegationRegistryInstance
                    .connect(_addr1)
                    .checkDelegateForToken(_addr1.address, _owner.address, _testInstance.address, 1)
            ).to.equal(true);

            expect(_fakeDelegationRegistryInstance.checkDelegateForToken).to.have.been.calledOnce;
        });

        it('Get operator returns caller when cold wallet is zero.', async function () {
            _fakeDelegationRegistryInstance.checkDelegateForToken
                .whenCalledWith(_addr1.address, hre.ethers.constants.AddressZero, _testInstance.address, 0)
                .returns(false); // Return false so that if it does get called, the test fails.

            const result = await _testInstance.getOperatorFromDelegation(
                _addr1.address,
                hre.ethers.constants.AddressZero,
                _testInstance.address,
                1
            );

            expect(result).to.equal(_addr1.address);

            // Call to getOperatorFromDelegation should short-circuit before call to Delegation Registry.
            expect(_fakeDelegationRegistryInstance.checkDelegateForToken).to.have.callCount(0);
        });

        it('Get operator returns caller when cold wallet is same as caller.', async function () {
            _fakeDelegationRegistryInstance.checkDelegateForToken
                .whenCalledWith(_addr1.address, _addr1.address, _testInstance.address, 0)
                .returns(false); // Return false so that if it does get called, the test fails.

            const result = await _testInstance.getOperatorFromDelegation(
                _addr1.address,
                _addr1.address,
                _testInstance.address,
                1
            );

            expect(result).to.equal(_addr1.address);

            // Call to getOperatorFromDelegation should short-circuit before call to Delegation Registry.
            expect(_fakeDelegationRegistryInstance.checkDelegateForToken).to.have.callCount(0);
        });

        it('Get operator returns cold wallet when delegated to addr1.', async function () {
            _fakeDelegationRegistryInstance.checkDelegateForToken
                .whenCalledWith(_addr1.address, _owner.address, _testInstance.address, 1)
                .returns(true);

            const result = await _testInstance.getOperatorFromDelegation(
                _addr1.address,
                _owner.address,
                _testInstance.address,
                1
            );

            expect(result).to.equal(_owner.address);
        });

        it('Get operator reverts if delegation is not valid.', async function () {
            _fakeDelegationRegistryInstance.checkDelegateForToken
                .whenCalledWith(_addr1.address, _owner.address, _testInstance.address, 1)
                .returns(true);

            await expect(
                _testInstance.getOperatorFromDelegation(_addr2.address, _owner.address, _testInstance.address, 1)
            ).to.be.revertedWithCustomError(_testInstance, 'NotAuthorizedForDelegation');
        });
    });
});
