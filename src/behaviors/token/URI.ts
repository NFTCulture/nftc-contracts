import { expect } from 'chai';

import { skipIfDefault } from '../../for-tests';

export function shouldDefineBaseURI(contractName: string, expectedURIFn: () => Promise<string | null>) {
    describe(`Base URI for ${contractName}:`, function () {
        beforeEach(async function () {
            expect(this).to.have.property('contractUnderTest'); // Must be set in caller

            this.expectedURI = await expectedURIFn();
        });

        describe('is defined:', function () {
            it('not as zero.', async function () {
                const baseUri = await this.contractUnderTest.baseURI();
                const isSetToZero =
                    baseUri ===
                    'https://nftculture.mypinata.cloud/ipfs/Qm00000000000000000000000000000000000000000000/'; // Zero

                const defaultConfigurationCheck = !isSetToZero;
                expect(skipIfDefault(this, defaultConfigurationCheck)).to.equal(true);
            });

            it('not as pinata public gateway.', async function () {
                const baseUri = await this.contractUnderTest.baseURI();
                const isSetToPublicPinata = baseUri === 'https://gateway.pinata.cloud/ipfs/'; // Pinata Public gateway

                const defaultConfigurationCheck = !isSetToPublicPinata;
                expect(skipIfDefault(this, defaultConfigurationCheck)).to.equal(true);
            });

            it('not as default for NFTC tokens.', async function () {
                const baseUri = await this.contractUnderTest.baseURI();
                const isSetToDefault =
                    baseUri ===
                    'https://nftculture.mypinata.cloud/ipfs/Qma8JyxudEvAjCTgA5jaWDAuJHooqHhxAu7qG8nuS53UD8/'; // NFTCReference721-rinkeby-Metadata_V1

                const defaultConfigurationCheck = !isSetToDefault;
                expect(skipIfDefault(this, defaultConfigurationCheck)).to.equal(true);
            });

            it('as expected.', async function () {
                const placeholderValue = 'DELIBERATELY BAD VALUE'; // Used if expectedURI is null.

                const baseUri = await this.contractUnderTest.baseURI();
                const baseUriIsCorrect = baseUri === (this.expectedURI ?? placeholderValue);

                const defaultConfigurationCheck = baseUriIsCorrect;
                expect(skipIfDefault(this, defaultConfigurationCheck)).to.equal(true);
            });
        });
    });
}
