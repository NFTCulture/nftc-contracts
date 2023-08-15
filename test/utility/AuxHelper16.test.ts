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

    context('Pack and Unpack 16 Tests', function () {
        // Can use windows calculator in Programmer mode to compute packed values.
        // EX: 777 << 48 [enter] == 218,706,056,904,179,712
        // EX: 555 << 32 [enter] == 2,383,706,849,280
        // EX: 333 << 16 [enter] + 111 == 21,823,599
        // Fully packed (21,823,599 + 2,383,706,849,280 + 218,706,056,904,179,712) == 218,708,440,632,852,591
        it('Pack 777, 555, 333 and 111', async function () {
            const result = await _testHarnessInstance.connect(_owner).pack16(777, 555, 333, 111);

            expect(result).to.equal(hre.ethers.BigNumber.from('218708440632852591'));
        });

        it('Unpack 218708440632852591', async function () {
            const result = await _testHarnessInstance
                .connect(_owner)
                .unpack16(hre.ethers.BigNumber.from('218708440632852591'));

            expect(result.left16).to.equal(777);
            expect(result.leftCenter16).to.equal(555);
            expect(result.rightCenter16).to.equal(333);
            expect(result.right16).to.equal(111);
        });
    });
});
