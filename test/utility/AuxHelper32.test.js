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

    context('Pack and Unpack 32 Tests', function () {
        // Can use windows calculator in Programmer mode to compute packed values.
        // EX: 333 << 32 [enter] + 111 [enter] == 1430224109679
        it('Pack 333 and 111', async function () {
            let result = await this.testHarnessInstance.connect(owner).pack32(333, 111);

            expect(result).to.equal(hre.ethers.BigNumber.from('1430224109679'));
        });

        it('Unpack 1430224109679', async function () {
            let result = await this.testHarnessInstance
                .connect(owner)
                .unpack32(hre.ethers.BigNumber.from('1430224109679'));

            expect(result.left32).to.equal(333);
            expect(result.right32).to.equal(111);
        });
    });
});
