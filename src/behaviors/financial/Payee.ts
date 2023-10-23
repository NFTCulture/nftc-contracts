import { expect } from 'chai';

import { skipIfDefault } from '../../for-tests';

export function shouldDefinePayees(contractName: string, expectedPayeesFn: () => Promise<(string | null)[]>) {
    describe(`Royalty payees for ${contractName}:`, function () {
        beforeEach(async function () {
            expect(this).to.have.property('contractUnderTest'); // Must be set in caller

            this.expectedPayees = await expectedPayeesFn();
        });

        it('are provided for validation', function () {
            expect(this.expectedPayees.length).to.be.greaterThan(0);
        });

        describe('are defined:', function () {
            it('not as 0x0.', async function () {
                const payeeZero = await this.contractUnderTest.payee(0);
                const payeeIsZero = payeeZero.toString() === '0x0000000000000000000000000000000000000000';

                const defaultConfigurationCheck = !payeeIsZero;
                expect(skipIfDefault(this, defaultConfigurationCheck)).to.equal(true);
            });

            it('not as 0xdead.', async function () {
                const payeeZero = await this.contractUnderTest.payee(0);
                const payeeIsDead = payeeZero.toString() === '0x000000000000000000000000000000000000dEaD';

                const defaultConfigurationCheck = !payeeIsDead;
                expect(skipIfDefault(this, defaultConfigurationCheck)).to.equal(true);
            });

            it('as expected.', async function () {
                const placeholderValue = '0xabcd'; // Used if expectedPayees[idx] is null.

                for (let idx = 0; idx < this.expectedPayees.length; idx++) {
                    const payeeCurrent = await this.contractUnderTest.payee(idx);
                    const payeeCurrentIsCorrect =
                        payeeCurrent.toString() === (this.expectedPayees[idx] ?? placeholderValue);

                    const defaultConfigurationCheck = payeeCurrentIsCorrect;
                    expect(skipIfDefault(this, defaultConfigurationCheck)).to.equal(true);
                }
            });
        });
    });
}
