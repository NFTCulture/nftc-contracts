const { expect } = require('chai');
const hre = require('hardhat');

require('dotenv').config();

const CONTRACT_NAME = 'MockERC721AWithRoyaltiesExtended';

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
            value: hre.ethers.utils.parseEther('100')
        };

        this.testInstance = await this.testFactory.deploy();

        await this.testInstance.deployed();
    });

    context('ERC2981_NFTCExtended works as expected', function () {
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
