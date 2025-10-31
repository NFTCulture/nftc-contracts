import { expect } from 'chai';
import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { addHardhatSignersToContext } from '../../../../src';
import { TemplateTestHarness, TemplateTestHarness__factory } from '../../../../typechain-types';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'TemplateTestHarness';

let _testHarnessContractFactory: TemplateTestHarness__factory;
let _testHarnessInstance: TemplateTestHarness;

describe(`File:${__filename}\nContract: ${TESTHARNESS_CONTRACT_NAME}\n`, function () {
    before(async function () {
        const contractName = TESTHARNESS_CONTRACT_NAME;

        _testHarnessContractFactory = (await hre.ethers.getContractFactory(
            contractName
        )) as TemplateTestHarness__factory;
    });

    beforeEach(async function () {
        _testHarnessInstance = await _testHarnessContractFactory.deploy();
        await _testHarnessInstance.waitForDeployment();

        this.mockInstance = _testHarnessInstance;
    });

    addHardhatSignersToContext();

    context('Context state:', function () {
        it(`modified by call on 'this'.`, async function () {
            expect(this.mockInstance).to.equal(_testHarnessInstance);
        });

        it('modified by use of helper hook (addHardhatSignersToContext).', async function () {
            expect(this.addr1).to.not.be.undefined;
            expect(this.addr1.address).to.equal('0x70997970C51812dc3A010C7d01b50e0d17dc79C8');

            expect(this.owner).to.not.be.undefined;
            expect(this.owner.address).to.equal('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
        });
    });
});
