import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { AuxHelperTestHarness, AuxHelperTestHarness__factory } from '../../typechain-types';


dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'AuxHelperTestHarness';

let _testHarnessContractFactory: AuxHelperTestHarness__factory;
let _testHarnessInstance: AuxHelperTestHarness;

let _owner: SignerWithAddress;

// Start test block
describe(`${TESTHARNESS_CONTRACT_NAME} Unit Tests`, function () {
    before(async function () {
        const contractUnderTest = TESTHARNESS_CONTRACT_NAME;

        _testHarnessContractFactory = (await hre.ethers.getContractFactory(
            contractUnderTest
        )) as AuxHelperTestHarness__factory;
    });

    beforeEach(async function () {
        const [owner, addr1, addr2, addr3, ...addrs] = await hre.ethers.getSigners();

        _owner = owner;

        _testHarnessInstance = await _testHarnessContractFactory.deploy();

        await _testHarnessInstance.deployed();
    });

    context('Pack and Unpack 32 Tests', function () {
        // Can use windows calculator in Programmer mode to compute packed values.
        // EX: 333 << 32 [enter] + 111 [enter] == 1430224109679
        it('Pack 333 and 111', async function () {
            const result = await _testHarnessInstance.connect(_owner).pack32(333, 111);

            expect(result).to.equal(hre.ethers.BigNumber.from('1430224109679'));
        });

        it('Unpack 1430224109679', async function () {
            const result = await _testHarnessInstance
                .connect(_owner)
                .unpack32(hre.ethers.BigNumber.from('1430224109679'));

            expect(result.left32).to.equal(333);
            expect(result.right32).to.equal(111);
        });
    });
});
