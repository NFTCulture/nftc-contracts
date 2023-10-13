import { Contract } from '@ethersproject/contracts';
import { expect } from 'chai';
import * as dotenv from 'dotenv';
import type * as ethers from 'ethers';
import hre from 'hardhat';

import { addHardhatSignersToContext } from '../../src';

dotenv.config();

const CONTRACT_NAME = 'MockERC721AWithRoyaltiesExtended';

let _testFactory: ethers.ContractFactory;
let _testInstance: Contract;

// Start test block
describe(`${CONTRACT_NAME} Unit Tests`, function () {
    before(async function () {
        const contractName = CONTRACT_NAME;

        _testFactory = await hre.ethers.getContractFactory(contractName);
    });

    beforeEach(async function () {
        _testInstance = await _testFactory.deploy();
        await _testInstance.deployed();
    });

    addHardhatSignersToContext();

    context('ERC2981_NFTCExtended works as expected', function () {
        it('Default royalties set properly.', async function () {
            const royaltyInfo = await _testInstance.connect(this.owner).royaltyInfo(1, hre.ethers.utils.parseEther('1'));

            const expectedReceiver = _testInstance.address;
            const expectedRoyalty = hre.ethers.utils.parseEther('.0999');

            expect(royaltyInfo[0]).to.equal(expectedReceiver);
            expect(royaltyInfo[1]).to.equal(expectedRoyalty);
        });

        it('Royalties can be updated.', async function () {
            await _testInstance.connect(this.owner).setDefaultRoyalty(this.addr1.address, 500);

            const royaltyInfo = await _testInstance.connect(this.owner).royaltyInfo(1, hre.ethers.utils.parseEther('1'));

            const expectedReceiver = this.addr1.address;
            const expectedRoyalty = hre.ethers.utils.parseEther('.0500');

            expect(royaltyInfo[0]).to.equal(expectedReceiver);
            expect(royaltyInfo[1]).to.equal(expectedRoyalty);
        });

        it('Unknown person cant change royalties.', async function () {
            await expect(_testInstance.connect(this.addr1).setDefaultRoyalty(this.addr1.address, 500)).to.be.revertedWith(
                'Ownable: caller is not the owner'
            );
        });
    });
});
