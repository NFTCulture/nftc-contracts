import { expect } from 'chai';
import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { addHardhatSignersToContext, skipIfDefaultForTest } from '../../../../src';
import { TemplateTestHarness, TemplateTestHarness__factory } from '../../../../typechain-types';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'TemplateTestHarness';

let _testHarnessContractFactory: TemplateTestHarness__factory;
let _testHarnessInstance: TemplateTestHarness;

describe(`Mocha Helpers Unit Tests`, function () {
    before(async function () {
        const contractName = TESTHARNESS_CONTRACT_NAME;

        _testHarnessContractFactory = (await hre.ethers.getContractFactory(
            contractName
        )) as TemplateTestHarness__factory;
    });

    beforeEach(async function () {
        _testHarnessInstance = await _testHarnessContractFactory.deploy();
        await _testHarnessInstance.deployed();

        this.mockInstance = _testHarnessInstance;
    });

    addHardhatSignersToContext();

    context('skipIfDefault function:', function () {
        it(`returns expected values.`, async function () {
            expect(skipIfDefaultForTest(this, true, false)).to.equal(true);

            expect(skipIfDefaultForTest(this, false, false)).to.equal(false);
        });

        it('does not skip if value is true.', async function () {
            skipIfDefaultForTest(this, true, true);

            expect(true).to.equal(true);
        });
    });
});
