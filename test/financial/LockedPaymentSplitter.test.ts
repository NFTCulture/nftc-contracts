import { expect } from 'chai';
import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { Contract } from '@ethersproject/contracts';

import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import type * as ethers from 'ethers';

dotenv.config();

const CONTRACT_NAME = 'LockedPaymentSplitterTestHarness';

let _testFactory: ethers.ContractFactory;
let _testInstance: Contract;

let _owner: SignerWithAddress;
let _addr1: SignerWithAddress;
let _addr3: SignerWithAddress;

let _provider = hre.ethers.provider;

// Start test block
describe(`${CONTRACT_NAME} Unit Tests`, function () {
    before(async function () {
        const contractName = CONTRACT_NAME;

        _testFactory = await hre.ethers.getContractFactory(contractName);
    });

    beforeEach(async function () {
        const [owner, addr1, addr2, addr3, ...addrs] = await hre.ethers.getSigners();

        _owner = owner;
        _addr1 = addr1;
        _addr3 = addr3;

        let addresses = [owner.address, addr1.address, addr2.address];

        let splits = [90, 5, 5];

        let aLargePayment = {
            value: hre.ethers.utils.parseEther('100'),
        };

        _testInstance = await _testFactory.deploy(
            addresses,
            splits,
            aLargePayment
        );

        await _testInstance.deployed();
    });

    context('Locked Payment Splitter', function () {
        it('Owner can send transfers.', async function () {
            let currentBalance = await _provider.getBalance(_addr1.address);

            await _testInstance.connect(_owner).release(_addr1.address);

            let addedBalance = hre.ethers.utils.parseEther('5');
            let expectedBalance = currentBalance.add(addedBalance);

            expect(await _provider.getBalance(_addr1.address)).to.equal(expectedBalance);
        });

        it('Self can get transfer.', async function () {
            let currentBalance = await _provider.getBalance(_addr1.address);

            await _testInstance.connect(_addr1).releaseToSelf();

            let addedBalance = hre.ethers.utils.parseEther('4'); // have to account for gas.
            let expectedBalance = currentBalance.add(addedBalance);

            expect(await _provider.getBalance(_addr1.address)).to.be.above(expectedBalance);
        });

        it('Unknown person cant trigger transfers.', async function () {
            let currentBalance = await _provider.getBalance(_addr1.address);

            await expect(_testInstance.connect(_addr3).release(_addr1.address)).to.be.reverted;

            expect(await _provider.getBalance(_addr1.address)).to.equal(currentBalance);
        });

        it('Unknown person does not receive money.', async function () {
            let currentBalance = await _provider.getBalance(_addr3.address);

            await expect(
                _testInstance.connect(_addr3).releaseToSelf()
            ).to.be.revertedWith('PaymentSplitter: no shares');

            // costs gas, balance should go down
            expect(await _provider.getBalance(_addr3.address)).to.be.below(currentBalance);
        });

        it('Zero address can\'t be used as new payee.', async function () {
            await expect(
                _testInstance.connect(_addr1).transferPayee('0x0000000000000000000000000000000000000000')
            ).to.be.revertedWith('PaymentSplitter: zero address');
        });

        it('Unknown person can\'t change payees.', async function () {
            // addr3 is not in the share list, can't set a new payee
            await expect(
                _testInstance.connect(_addr3).transferPayee(_addr3.address)
            ).to.be.revertedWith('PaymentSplitter: no owned shares');
            // shares should still be 0
            expect(await _testInstance.connect(_addr3).shares(_addr3.address)).to.equal(0);
        });

        it('Address with existing shares can\'t be used as new payee.', async function () {
            await expect(
                _testInstance.connect(_addr1).transferPayee(_owner.address)
            ).to.be.revertedWith('PaymentSplitter: payee has shares');
        });

        it('Valid address can be used as new payee.', async function () {
            // transfer payee from addr1 to addr3 (5 shares)
            await _testInstance.connect(_addr1).transferPayee(_addr3.address);
            // total shares still 100
            expect(await _testInstance.connect(_addr1).totalShares()).to.equal(100);
            // shares of new payee should be 5 now
            expect(await _testInstance.connect(_addr3).shares(_addr3.address)).to.equal(5);
            // shares of original payee should be 0
            expect(await _testInstance.connect(_addr1).shares(_addr1.address)).to.equal(0);
        });
    });
});