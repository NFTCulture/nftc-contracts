const { expect } = require('chai');
const hre = require('hardhat');
const keccak256 = require('keccak256');

require('dotenv').config();

const TESTHARNESS_CONTRACT_NAME = 'TemplateTestHarness';

// Start test block
describe(`${TESTHARNESS_CONTRACT_NAME} Unit Tests`, function () {
    before(async function () {
        ContractName = TESTHARNESS_CONTRACT_NAME;
        
        this.testHarnessContractFactory = await hre.ethers.getContractFactory(ContractName);
    });

    beforeEach(async function () {
        [owner, addr1, addr2, addr3, ...addrs] = await hre.ethers.getSigners();

        this.testHarnessInstance = await this.testHarnessContractFactory.deploy(
            // No Args
        );

        await this.testHarnessInstance.deployed();
    });

    context('Test Group 1', function () {
        it('Test Case 1', async function () {
            console.log("Init Tests");
        });
    });
});