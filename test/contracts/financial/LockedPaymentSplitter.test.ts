import { expect } from 'chai';
import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { addHardhatSignersToContext } from '../../../src';
import { LockedPaymentSplitterMock, LockedPaymentSplitterMock__factory } from '../../../typechain-types';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'LockedPaymentSplitterMock';

let _testFactory: LockedPaymentSplitterMock__factory;
let _testInstance: LockedPaymentSplitterMock;

const _provider = hre.ethers.provider;

// Start test block
describe(`File:${__filename}\nContract: ${TESTHARNESS_CONTRACT_NAME}\n`, function () {
    before(async function () {
        _testFactory = await hre.ethers.getContractFactory('LockedPaymentSplitterMock');
    });

    beforeEach(async function () {
        const signers = await hre.ethers.getSigners();
        const addresses = [signers[0].address, signers[1].address, signers[2].address];
        const splits = [90, 5, 5];
        const aLargePayment = {
            value: hre.ethers.parseEther('100')
        };

        _testInstance = await _testFactory.deploy(addresses, splits, aLargePayment);

        await _testInstance.waitForDeployment();
    });

    addHardhatSignersToContext();

    context('Locked Payment Splitter', function () {
        it('Owner can send transfers.', async function () {
            const currentBalance = await _provider.getBalance(this.addr1.address);

            await _testInstance.connect(this.owner).release(this.addr1.address);

            const addedBalance = hre.ethers.parseEther('5');
            const expectedBalance = currentBalance + addedBalance;

            expect(await _provider.getBalance(this.addr1.address)).to.equal(expectedBalance);
        });

        it('Self can get transfer.', async function () {
            const currentBalance = await _provider.getBalance(this.addr1.address);

            await _testInstance.connect(this.addr1).releaseToSelf();

            const addedBalance = hre.ethers.parseEther('4'); // have to account for gas.
            const expectedBalance = currentBalance + addedBalance;

            expect(await _provider.getBalance(this.addr1.address)).to.be.above(expectedBalance);
        });

        it('Unknown person cant trigger transfers.', async function () {
            const currentBalance = await _provider.getBalance(this.addr1.address);

            await expect(_testInstance.connect(this.addr3).release(this.addr1.address)).to.be.reverted;

            expect(await _provider.getBalance(this.addr1.address)).to.equal(currentBalance);
        });

        it('Unknown person does not receive money.', async function () {
            const currentBalance = await _provider.getBalance(this.addr3.address);

            await expect(_testInstance.connect(this.addr3).releaseToSelf()).to.be.revertedWith(
                'PaymentSplitter: no shares'
            );

            // costs gas, balance should go down
            expect(await _provider.getBalance(this.addr3.address)).to.be.below(currentBalance);
        });

        it("Zero address can't be used as new payee.", async function () {
            await expect(
                _testInstance.connect(this.addr1).transferPayee('0x0000000000000000000000000000000000000000')
            ).to.be.revertedWith('PaymentSplitter: zero address');
        });

        it("Unknown person can't change payees.", async function () {
            // addr3 is not in the share list, can't set a new payee
            await expect(_testInstance.connect(this.addr3).transferPayee(this.addr3.address)).to.be.revertedWith(
                'PaymentSplitter: no owned shares'
            );
            // shares should still be 0
            expect(await _testInstance.connect(this.addr3).shares(this.addr3.address)).to.equal(0);
        });

        it("Address with existing shares can't be used as new payee.", async function () {
            await expect(_testInstance.connect(this.addr1).transferPayee(this.owner.address)).to.be.revertedWith(
                'PaymentSplitter: payee has shares'
            );
        });

        it('Valid address can be used as new payee.', async function () {
            // transfer payee from addr1 to addr3 (5 shares)
            await _testInstance.connect(this.addr1).transferPayee(this.addr3.address);
            // total shares still 100
            expect(await _testInstance.connect(this.addr1).totalShares()).to.equal(100);
            // shares of new payee should be 5 now
            expect(await _testInstance.connect(this.addr3).shares(this.addr3.address)).to.equal(5);
            // shares of original payee should be 0
            expect(await _testInstance.connect(this.addr1).shares(this.addr1.address)).to.equal(0);
        });
    });
});
