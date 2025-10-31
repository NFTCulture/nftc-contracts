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
        await _testHarnessInstance.waitForDeployment();
    });

    addHardhatSignersToContext();

    context('AuxHelper:', function () {
        // Can use windows calculator in Programmer mode to compute packed values.
        // EX: 777 << 48 [enter] == 218,706,056,904,179,712
        // EX: 555 << 32 [enter] == 2,383,706,849,280
        // EX: 333 << 16 [enter] + 111 == 21,823,599
        // Fully packed (21,823,599 + 2,383,706,849,280 + 218,706,056,904,179,712) == 218,708,440,632,852,591
        it('can pack 777, 555, 333 and 111.', async function () {
            const result = await _testHarnessInstance.connect(this.owner).pack16(777, 555, 333, 111);

            expect(result).to.equal(218708440632852591n);
        });

        it('can unpack 218708440632852591.', async function () {
            const result = await _testHarnessInstance
                .connect(this.owner)
                .unpack16(218708440632852591n);

            expect(result.left16).to.equal(777);
            expect(result.leftCenter16).to.equal(555);
            expect(result.rightCenter16).to.equal(333);
            expect(result.right16).to.equal(111);
        });
    });
});
