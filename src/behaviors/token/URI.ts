import { expect } from 'chai';

import { skipIfDefault } from '../../for-tests';

export function shouldDefineBaseURI(contractName: string, expectedBaseURIFn: () => Promise<string | null>) {
    describe(`Base URI for ${contractName}:`, function () {
        beforeEach(async function () {
            expect(this).to.have.property('contractUnderTest'); // Must be set in caller

            this.expectedURI = await expectedBaseURIFn();
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

export function shouldDefine1155URI(contractName: string, expectedURIFn: () => Promise<string | null>) {
    describe(`ERC1155 URI for ${contractName}:`, function () {
        beforeEach(async function () {
            expect(this).to.have.property('contractUnderTest'); // Must be set in caller

            this.expectedURI = await expectedURIFn();
        });

        describe('is defined:', function () {
            it('not as zero.', async function () {
                const erc1155Uri = await this.contractUnderTest.uri(0);
                const isSetToZero = erc1155Uri === 'https://nftc-media.mypinata.cloud/ipfs/Qm000000/{id}.json'; // Zero

                const defaultConfigurationCheck = !isSetToZero;
                expect(skipIfDefault(this, defaultConfigurationCheck)).to.equal(true);
            });

            it('not as pinata public gateway.', async function () {
                const erc1155Uri = await this.contractUnderTest.uri(0);
                const isSetToPublicPinata = erc1155Uri === 'https://gateway.pinata.cloud/ipfs/ipfs/Qm000000/{id}.json'; // Pinata Public gateway

                const defaultConfigurationCheck = !isSetToPublicPinata;
                expect(skipIfDefault(this, defaultConfigurationCheck)).to.equal(true);
            });

            it('not as default for NFTC tokens.', async function () {
                const erc1155Uri = await this.contractUnderTest.uri(0);
                const isSetToDefault =
                    erc1155Uri ===
                    'https://nftc-media.mypinata.cloud/ipfs/QmNaNCsufrof7s9xp7whbo8dq1hdYdjmjYfgKvGSFbg23f/{id}.json'; // Dr3amLabs_Reference1155_Metadata_V1cb

                const defaultConfigurationCheck = !isSetToDefault;
                expect(skipIfDefault(this, defaultConfigurationCheck)).to.equal(true);
            });

            it('as expected.', async function () {
                const placeholderValue = 'DELIBERATELY BAD VALUE'; // Used if expectedURI is null.

                const erc1155Uri = await this.contractUnderTest.uri(0);
                const erc1155UriIsCorrect = erc1155Uri === (this.expectedURI ?? placeholderValue);

                const defaultConfigurationCheck = erc1155UriIsCorrect;
                expect(skipIfDefault(this, defaultConfigurationCheck)).to.equal(true);
            });
        });
    });
}
