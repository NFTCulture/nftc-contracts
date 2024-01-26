import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Contract, Signer } from 'ethers';

describe('MockERC7572_ContractMetadata', function () {
    let accounts: Signer[];
    let contractMetadata: Contract;
    let owner: Signer;
    let nonOwner: Signer;

    beforeEach(async function () {
        // Deploy the contract before each test
        accounts = await ethers.getSigners();
        owner = accounts[0];
        nonOwner = accounts[1];

        const ERC7572_ContractMetadata = await ethers.getContractFactory('MockERC7572_ContractMetadata', owner);
        contractMetadata = await ERC7572_ContractMetadata.deploy();
        await contractMetadata.deployed();
    });

    it('Should return the initial contract URI as empty', async function () {
        expect(await contractMetadata.contractURI()).to.equal('');
    });

    it('Should set and return new contract URI', async function () {
        const newURI = 'https://example.com/metadata.json';
        await contractMetadata.setContractURI(newURI);
        expect(await contractMetadata.contractURI()).to.equal(newURI);
    });

    it('Should revert when a non-owner tries to set contract URI', async function () {
        const newURI = 'https://example.com/metadata.json';
        await expect(contractMetadata.connect(nonOwner).setContractURI(newURI)).to.be.revertedWithCustomError(
            contractMetadata,
            'CallerIsNotOwner'
        );
    });
});
