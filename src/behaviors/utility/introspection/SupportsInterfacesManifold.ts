import { expect } from 'chai';

import {
    MXYZ_FN_SIGNATURES,
    MXYZ_INTERFACE_IDS,
    MXYZ_INTERFACES
} from '../../../for-tests/utils/introspection/MXYZ_Interfaces';
import { ERC165 } from '../../../for-tests/utils/introspection/makeInterfaceId';

const INVALID_ID = '0xffffffff';

export function shouldSupportInterfacesManifold(contractName: string, interfaces: string[] = []) {
    describe(`Contract ${contractName} shouldSupportInterfaces ${interfaces.join(', ')}:`, function () {
        before(async function () {
            // TODO?
        });

        beforeEach(async function () {
            expect(this).to.have.property('contractUnderTest'); // Must be set in caller
            expect(this).to.have.property('owner'); // Must be set in caller
        });

        describe('when the Manifold interfaceId is supported', function () {
            it('uses less than 30k gas', async function () {
                for (const k of interfaces) {
                    const interfaceId = MXYZ_INTERFACE_IDS[k] ?? k;

                    expect(await this.contractUnderTest.estimateGas.supportsInterface(interfaceId)).to.be.lte(30000);
                }
            });

            it('returns true', async function () {
                for (const k of interfaces) {
                    const interfaceId = MXYZ_INTERFACE_IDS[k] ?? k;
                    expect(await this.contractUnderTest.supportsInterface(interfaceId)).to.equal(
                        true,
                        `does not support ${k}`
                    );
                }
            });
        });

        describe('when the Manifold interfaceId is not supported', function () {
            it('uses less than 30k', async function () {
                expect(await this.contractUnderTest.estimateGas.supportsInterface(INVALID_ID)).to.be.lte(30000);
            });

            it('returns false', async function () {
                expect(await this.contractUnderTest.supportsInterface(INVALID_ID)).to.be.equal(
                    false,
                    `supports ${INVALID_ID}`
                );
            });
        });

        it('all Manifold interface functions are in ABI', async function () {
            for (const k of interfaces) {
                // skip interfaces for which we don't have a function list
                if (MXYZ_INTERFACES[k] === undefined) continue;
                for (const fnName of MXYZ_INTERFACES[k]) {
                    const fnSig = MXYZ_FN_SIGNATURES[fnName];
                    //console.log(`Signature: [${fnSig}] && Function: [${fnName}]`);
                    const abiFunctions = Object.keys(this.contractUnderTest.functions);

                    // MV: I'm not sure where in HardhatEthers the function interfaceIds are stored, so computing
                    // them on the fly from the function names that we do have.
                    expect(abiFunctions.filter((fn) => ERC165([fn]) === fnSig).length).to.equal(
                        1,
                        `did not find ${fnName}`
                    );
                }
            }
        });
    });
}
