const { expect } = require('chai');
const hre = require('hardhat');
const keccak256 = require('keccak256');

require('dotenv').config();

const TESTHARNESS_CONTRACT_NAME = 'AuxHelperTestHarness';

// Start test block
describe(`${TESTHARNESS_CONTRACT_NAME} Unit Tests`, function () {
    before(async function () {
        ContractName = TESTHARNESS_CONTRACT_NAME;

        this.testHarnessContractFactory = await hre.ethers.getContractFactory(ContractName);
    });

    beforeEach(async function () {
        [owner, addr1, addr2, addr3, ...addrs] = await hre.ethers.getSigners();

        this.testHarnessInstance = await this.testHarnessContractFactory
            .deploy
            // No Args
            ();

        await this.testHarnessInstance.deployed();
    });

    context('Test Group 1', function () {
        it('Test Case 1', async function () {
            console.log('Init Tests');
        });
    });

    context('Pack and Unpack 16 Tests', function () {
        // Can use windows calculator in Programmer mode to compute packed values.
        // EX: 777 << 48 [enter] == 218,706,056,904,179,712
        // EX: 555 << 32 [enter] == 2,383,706,849,280
        // EX: 333 << 16 [enter] + 111 == 21,823,599
        // Fully packed (21,823,599 + 2,383,706,849,280 + 218,706,056,904,179,712) == 218,708,440,632,852,591
        it('Pack 777, 555, 333 and 111', async function () {
            let result = await this.testHarnessInstance.connect(owner).pack16(777, 555, 333, 111);

            expect(result).to.equal(hre.ethers.BigNumber.from('218708440632852591'));
        });

        it('Unpack 218708440632852591', async function () {
            let result = await this.testHarnessInstance
                .connect(owner)
                .unpack16(hre.ethers.BigNumber.from('218708440632852591'));

            expect(result.left16).to.equal(777);
            expect(result.leftCenter16).to.equal(555);
            expect(result.rightCenter16).to.equal(333);
            expect(result.right16).to.equal(111);
        });
    });
});
