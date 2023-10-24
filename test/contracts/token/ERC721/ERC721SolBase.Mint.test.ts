import { expect } from 'chai';
import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { addHardhatSignersToContext } from '../../../../src/for-tests/context/HardhatHelpers';
import { MockERC721SolBase, MockERC721SolBase__factory } from '../../../../typechain-types';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'MockERC721SolBase';

let _testHarnessContractFactory: MockERC721SolBase__factory;
let _testHarnessInstance: MockERC721SolBase;

// Start test block
describe(`File:${__filename}\nContract: ${TESTHARNESS_CONTRACT_NAME}\n`, function () {
    before(async function () {
        _testHarnessContractFactory = (await hre.ethers.getContractFactory(
            TESTHARNESS_CONTRACT_NAME
        )) as MockERC721SolBase__factory;
    });

    beforeEach(async function () {
        _testHarnessInstance = await _testHarnessContractFactory.deploy('http://gateway.pinata.com/');

        await _testHarnessInstance.deployed();
    });

    addHardhatSignersToContext();

    context('Minter Tests...', function () {
        it('Can Mint Regular', async function () {
            await _testHarnessInstance.connect(this.owner).regularMint(this.addr1.address, 0);
            await _testHarnessInstance.connect(this.owner).regularMint(this.addr1.address, 1);

            const newBalance = await _testHarnessInstance.connect(this.addr1).balanceOf(this.addr1.address);

            expect(newBalance).to.equal(2);
        });

        it('Can Safe Mint', async function () {
            await _testHarnessInstance.connect(this.owner).safeMint(this.addr1.address, 0);
            await _testHarnessInstance.connect(this.owner).safeMint(this.addr1.address, 1);

            const newBalance = await _testHarnessInstance.connect(this.addr1).balanceOf(this.addr1.address);

            expect(newBalance).to.equal(2);
        });

        it('Regular Mint increases supply', async function () {
            await _testHarnessInstance.connect(this.owner).regularMint(this.addr1.address, 0);
            await _testHarnessInstance.connect(this.owner).regularMint(this.addr1.address, 1);
            await _testHarnessInstance.connect(this.owner).regularMint(this.addr1.address, 2);

            const totalSupply = await _testHarnessInstance.connect(this.addr1).totalSupply();
            const totalMinted = await _testHarnessInstance.connect(this.addr1).totalMinted();

            expect(totalSupply).to.equal(3);
            expect(totalMinted).to.equal(3);
        });

        it('Safe Mint increases supply', async function () {
            await _testHarnessInstance.connect(this.owner).safeMint(this.addr1.address, 0);
            await _testHarnessInstance.connect(this.owner).safeMint(this.addr1.address, 1);
            await _testHarnessInstance.connect(this.owner).safeMint(this.addr1.address, 2);

            const totalSupply = await _testHarnessInstance.connect(this.addr1).totalSupply();
            const totalMinted = await _testHarnessInstance.connect(this.addr1).totalMinted();

            expect(totalSupply).to.equal(3);
            expect(totalMinted).to.equal(3);
        });
    });
});
