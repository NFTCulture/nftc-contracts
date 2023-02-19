const { expect } = require('chai');
const hre = require('hardhat');

require('dotenv').config();

const CONTRACT_NAME = 'NFTCSplitsAndRoyaltiesTestHarness';

// Start test block
describe(`${CONTRACT_NAME} Unit Tests`, function () {
    before(async function () {
        ContractName = CONTRACT_NAME;
        
        this.testFactory = await hre.ethers.getContractFactory(ContractName);
    });

    beforeEach(async function () {
        [owner, addr1, addr2, addr3, ...addrs] = await hre.ethers.getSigners();

        let addresses = [owner.address, addr1.address, addr2.address];

        let splits = [90, 5, 5];

        let aLargePayment = {
            value: hre.ethers.utils.parseEther('100'),
        };

        this.testInstance = await this.testFactory.deploy(
            addresses,
            splits,
            aLargePayment
        );

        await this.testInstance.deployed();
    });

    context('Payment Splitter Tests', function () {
        it('Owner can send transfers.', async function () {
            let provider = hre.ethers.provider;
            let currentBalance = await provider.getBalance(addr1.address);

            await this.testInstance.connect(owner).release(addr1.address);

            let addedBalance = hre.ethers.utils.parseEther('5');
            let expectedBalance = currentBalance.add(addedBalance);

            expect(await provider.getBalance(addr1.address)).to.equal(expectedBalance);
        });

        it('Self can get transfer.', async function () {
            let provider = hre.ethers.provider;
            let currentBalance = await provider.getBalance(addr1.address);

            await this.testInstance.connect(addr1).releaseToSelf();

            let addedBalance = hre.ethers.utils.parseEther('4'); // have to account for gas.
            let expectedBalance = currentBalance.add(addedBalance);

            expect(await provider.getBalance(addr1.address)).to.be.above(expectedBalance);
        });

        it('Unknown person cant trigger transfers.', async function () {
            let provider = hre.ethers.provider;
            let currentBalance = await provider.getBalance(addr1.address);

            await expect(this.testInstance.connect(addr3).release(addr1.address)).to.be.reverted;

            expect(await provider.getBalance(addr1.address)).to.equal(currentBalance);
        });

        it('Unknown person does not receive money.', async function () {
            let provider = hre.ethers.provider;
            let currentBalance = await provider.getBalance(addr3.address);

            await expect(
                this.testInstance.connect(addr3).releaseToSelf()
            ).to.be.revertedWith('PaymentSplitter: no shares');

            // costs gas, balance should go down
            expect(await provider.getBalance(addr3.address)).to.be.below(currentBalance);
        });

        it('Zero address can\'t be used as new payee.', async function () {
            await expect(
                this.testInstance.connect(addr1).transferPayee('0x0000000000000000000000000000000000000000')
            ).to.be.revertedWith('PaymentSplitter: zero address');
        });

        it('Unknown person can\'t change payees.', async function () {
            // addr3 is not in the share list, can't set a new payee
            await expect(
                this.testInstance.connect(addr3).transferPayee(addr3.address)
            ).to.be.revertedWith('PaymentSplitter: no owned shares');
            // shares should still be 0
            expect(await this.testInstance.connect(addr3).shares(addr3.address)).to.equal(0);
        });

        it('Address with existing shares can\'t be used as new payee.', async function () {
            await expect(
                this.testInstance.connect(addr1).transferPayee(owner.address)
            ).to.be.revertedWith('PaymentSplitter: payee has shares');
        });

        it('Valid address can be used as new payee.', async function () {
            // transfer payee from addr1 to addr3 (5 shares)
            await this.testInstance.connect(addr1).transferPayee(addr3.address);
            // total shares still 100
            expect(await this.testInstance.connect(addr1).totalShares()).to.equal(100);
            // shares of new payee should be 5 now
            expect(await this.testInstance.connect(addr3).shares(addr3.address)).to.equal(5);
            // shares of original payee should be 0
            expect(await this.testInstance.connect(addr1).shares(addr1.address)).to.equal(0);
        });
    });

    context('ERC2981 royalties tests', function () {
        it('Default royalties set properly.', async function () {
            let royaltyInfo = await this.testInstance.connect(owner).royaltyInfo(1, hre.ethers.utils.parseEther('1'));

            let expectedReceiver = this.testInstance.address;
            let expectedRoyalty = hre.ethers.utils.parseEther('.0999');

            expect(royaltyInfo[0]).to.equal(expectedReceiver);
            expect(royaltyInfo[1]).to.equal(expectedRoyalty);
        });

        it('Royalties can be updated.', async function () {
            await this.testInstance.connect(owner).setDefaultRoyalty(addr1.address, 500);

            let royaltyInfo = await this.testInstance.connect(owner).royaltyInfo(1, hre.ethers.utils.parseEther('1'));

            let expectedReceiver = addr1.address;
            let expectedRoyalty = hre.ethers.utils.parseEther('.0500');

            expect(royaltyInfo[0]).to.equal(expectedReceiver);
            expect(royaltyInfo[1]).to.equal(expectedRoyalty);
        });

        it('Unknown person cant change royalties.', async function () {
            await expect(this.testInstance.connect(addr1).setDefaultRoyalty(addr1.address, 500)).to.be.revertedWith(
                'Ownable: caller is not the owner'
            );
        });
    });
});