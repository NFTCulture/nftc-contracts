import { expect } from 'chai';
import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { addHardhatSignersToContext } from '../../../src';
import { AuxHelperTestHarness, AuxHelperTestHarness__factory } from '../../../typechain-types';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'AuxHelperTestHarness';

let _testHarnessContractFactory: AuxHelperTestHarness__factory;
let _testHarnessInstance: AuxHelperTestHarness;

// Start test block
describe(`File:${__filename}\nContract: ${TESTHARNESS_CONTRACT_NAME}\n`, function () {
    before(async function () {
        const contractUnderTest = TESTHARNESS_CONTRACT_NAME;

        _testHarnessContractFactory = (await hre.ethers.getContractFactory(
            contractUnderTest
        )) as AuxHelperTestHarness__factory;
    });

    beforeEach(async function () {
        _testHarnessInstance = await _testHarnessContractFactory.deploy();
        await _testHarnessInstance.deployed();
    });

    addHardhatSignersToContext();

    context('AuxHelper:', function () {
        // Can use windows calculator in Programmer mode to compute packed values.
        // EX: 333 << 32 [enter] + 111 [enter] == 1430224109679
        it('can pack 333 and 111.', async function () {
            const result = await _testHarnessInstance.connect(this.owner).pack32(333, 111);

            expect(result).to.equal(hre.ethers.BigNumber.from('1430224109679'));
        });

        it('can unpack 1430224109679.', async function () {
            const result = await _testHarnessInstance
                .connect(this.owner)
                .unpack32(hre.ethers.BigNumber.from('1430224109679'));

            expect(result.left32).to.equal(333);
            expect(result.right32).to.equal(111);
        });
    });
});
