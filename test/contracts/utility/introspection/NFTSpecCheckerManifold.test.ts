import { expect } from 'chai';
import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { addHardhatSignersToContext } from '../../../../src';
import { NFTSpecCheckerManifold, NFTSpecCheckerManifold__factory } from '../../../../typechain-types';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'TemplateTestHarness';

let _specCheckerContractFactory: NFTSpecCheckerManifold__factory;

// let _testHarnessInstance: TemplateTestHarness; // Unused in this test
let _specCheckerInstance: NFTSpecCheckerManifold;

// Start test block
describe(`File:${__filename}\nContract: ${TESTHARNESS_CONTRACT_NAME}\n`, function () {
    before(async function () {
        _specCheckerContractFactory = await hre.ethers.getContractFactory('NFTSpecCheckerManifold');
    });

    beforeEach(async function () {
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
