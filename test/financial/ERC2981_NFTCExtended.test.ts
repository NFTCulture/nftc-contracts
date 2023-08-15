import { Contract } from '@ethersproject/contracts';
import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import * as dotenv from 'dotenv';
import type * as ethers from 'ethers';
import hre from 'hardhat';

dotenv.config();

const CONTRACT_NAME = 'MockERC721AWithRoyaltiesExtended';

let _testFactory: ethers.ContractFactory;
let _testInstance: Contract;

let _owner: SignerWithAddress;
let _addr1: SignerWithAddress;

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

        const addresses = [owner.address, addr1.address, addr2.address];

        const splits = [90, 5, 5];

        const aLargePayment = {
            value: hre.ethers.utils.parseEther('100')
        };

        _testInstance = await _testFactory.deploy();

        await _testInstance.deployed();
    });

    context('ERC2981_NFTCExtended works as expected', function () {
        it('Default royalties set properly.', async function () {
            const royaltyInfo = await _testInstance.connect(_owner).royaltyInfo(1, hre.ethers.utils.parseEther('1'));

            const expectedReceiver = _testInstance.address;
            const expectedRoyalty = hre.ethers.utils.parseEther('.0999');

            expect(royaltyInfo[0]).to.equal(expectedReceiver);
            expect(royaltyInfo[1]).to.equal(expectedRoyalty);
        });

        it('Royalties can be updated.', async function () {
            await _testInstance.connect(_owner).setDefaultRoyalty(_addr1.address, 500);

            const royaltyInfo = await _testInstance.connect(_owner).royaltyInfo(1, hre.ethers.utils.parseEther('1'));

            const expectedReceiver = _addr1.address;
            const expectedRoyalty = hre.ethers.utils.parseEther('.0500');

            expect(royaltyInfo[0]).to.equal(expectedReceiver);
            expect(royaltyInfo[1]).to.equal(expectedRoyalty);
        });

        it('Unknown person cant change royalties.', async function () {
            await expect(_testInstance.connect(_addr1).setDefaultRoyalty(_addr1.address, 500)).to.be.revertedWith(
                'Ownable: caller is not the owner'
            );
        });
    });
});
