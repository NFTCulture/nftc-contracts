import { Contract } from '@ethersproject/contracts';
import { expect } from 'chai';
import * as dotenv from 'dotenv';
import type * as ethers from 'ethers';
import hre from 'hardhat';

import { addHardhatSignersToContext } from '../../../../src';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'TemplateTestHarness';
const SPEC_CHECKER_CONTRACT_NAME = 'NFTSpecCheckerManifold';

let _testHarnessContractFactory: ethers.ContractFactory;
let _specCheckerContractFactory: ethers.ContractFactory;

let _testHarnessInstance: Contract;
let _specCheckerInstance: Contract;

// Start test block
describe(`File:${__filename}\nContract: ${TESTHARNESS_CONTRACT_NAME}\n`, function () {
    before(async function () {
        _testHarnessContractFactory = await hre.ethers.getContractFactory(TESTHARNESS_CONTRACT_NAME);
        _specCheckerContractFactory = await hre.ethers.getContractFactory(SPEC_CHECKER_CONTRACT_NAME);
    });

    beforeEach(async function () {
        _testHarnessInstance = await _testHarnessContractFactory.deploy();
        _specCheckerInstance = await _specCheckerContractFactory.deploy();
    });

    addHardhatSignersToContext();

    context('NFTC Spec Checker Manifold:', function () {
        it('uses valid interface codes', async function () {
            const lazyDeliveryCode = await _specCheckerInstance.connect(this.owner).getLazyDeliveryCode();
            expect(lazyDeliveryCode).to.equal('0x8fb5170e');

            const lazyDeliveryMetadataCode = await _specCheckerInstance
                .connect(this.owner)
                .getLazyDeliveryMetadataCode();
            expect(lazyDeliveryMetadataCode).to.equal('0xf1c68982');

            const priceEngineCode = await _specCheckerInstance.connect(this.owner).getPriceEngineCode();
            expect(priceEngineCode).to.equal('0x8e027244');
        });
    });
});
