import { Contract } from '@ethersproject/contracts';
import { expect } from 'chai';
import * as dotenv from 'dotenv';
import type * as ethers from 'ethers';
import hre from 'hardhat';

import { addHardhatSignersToContext } from '../../../../src';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'TemplateTestHarness';
const SPEC_CHECKER_CONTRACT_NAME = 'NFTSpecChecker';
const MOCK_E20_CONTRACT_NAME = 'MockERC20';
const MOCK_E721AB_CONTRACT_NAME = 'MockERC721ABurnable';
const MOCK_E1155_CONTRACT_NAME = 'MockERC1155';

const MOCK_E721GoodRoyalties_CONTRACT_NAME = 'MockERC721AWithRoyaltiesGood';
const MOCK_E721BadARoyalties_CONTRACT_NAME = 'MockERC721AWithRoyaltiesBadAlpha';
const MOCK_E721BadBRoyalties_CONTRACT_NAME = 'MockERC721AWithRoyaltiesBadBeta';

let _testHarnessContractFactory: ethers.ContractFactory;
let _specCheckerContractFactory: ethers.ContractFactory;
let _mockERC20ContractFactory: ethers.ContractFactory;
let _mockERC721ABContractFactory: ethers.ContractFactory;
let _mockERC1155ContractFactory: ethers.ContractFactory;
let _mockERC721GoodRoyaltiesContractFactory: ethers.ContractFactory;
let _mockERC721BadARoyaltiesContractFactory: ethers.ContractFactory;
let _mockERC721BadBRoyaltiesContractFactory: ethers.ContractFactory;

let _testHarnessInstance: Contract;
let _specCheckerInstance: Contract;
let _mockERC20Instance: Contract;
let _mockERC721ABInstance: Contract;
let _mockERC1155Instance: Contract;
let _mockERC721GoodRoyaltiesInstance: Contract;
let _mockERC721BadARoyaltiesInstance: Contract;
let _mockERC721BadBRoyaltiesInstance: Contract;

// Start test block
describe(`File:${__filename}\nContract: ${TESTHARNESS_CONTRACT_NAME}\n`, function () {
    before(async function () {
        _testHarnessContractFactory = await hre.ethers.getContractFactory(TESTHARNESS_CONTRACT_NAME);
        _specCheckerContractFactory = await hre.ethers.getContractFactory(SPEC_CHECKER_CONTRACT_NAME);
        _mockERC20ContractFactory = await hre.ethers.getContractFactory(MOCK_E20_CONTRACT_NAME);
        _mockERC721ABContractFactory = await hre.ethers.getContractFactory(MOCK_E721AB_CONTRACT_NAME);
        _mockERC1155ContractFactory = await hre.ethers.getContractFactory(MOCK_E1155_CONTRACT_NAME);

        _mockERC721GoodRoyaltiesContractFactory = await hre.ethers.getContractFactory(
            MOCK_E721GoodRoyalties_CONTRACT_NAME
        );
        _mockERC721BadARoyaltiesContractFactory = await hre.ethers.getContractFactory(
            MOCK_E721BadARoyalties_CONTRACT_NAME
        );
        _mockERC721BadBRoyaltiesContractFactory = await hre.ethers.getContractFactory(
            MOCK_E721BadBRoyalties_CONTRACT_NAME
        );
    });

    beforeEach(async function () {
        _testHarnessInstance = await _testHarnessContractFactory.deploy();
        _specCheckerInstance = await _specCheckerContractFactory.deploy();
        _mockERC20Instance = await _mockERC20ContractFactory.deploy();
        _mockERC721ABInstance = await _mockERC721ABContractFactory.deploy();
        _mockERC1155Instance = await _mockERC1155ContractFactory.deploy();

        await _testHarnessInstance.deployed();
        await _specCheckerInstance.deployed();
        await _mockERC20Instance.deployed();
        await _mockERC721ABInstance.deployed();
        await _mockERC1155Instance.deployed();

        _mockERC721GoodRoyaltiesInstance = await _mockERC721GoodRoyaltiesContractFactory.deploy();
        _mockERC721BadARoyaltiesInstance = await _mockERC721BadARoyaltiesContractFactory.deploy();
        _mockERC721BadBRoyaltiesInstance = await _mockERC721BadBRoyaltiesContractFactory.deploy();

        await _mockERC721GoodRoyaltiesInstance.deployed();
        await _mockERC721BadARoyaltiesInstance.deployed();
        await _mockERC721BadBRoyaltiesInstance.deployed();
    });

    addHardhatSignersToContext();

    context('Spec Checker:', function () {
        it.skip('can validate ERC20s.', async function () {
            // NOTE: Technically OZ ERC20 doesn't implement ERC165. Hopefully at some point they fix this.
            const result = await _specCheckerInstance.connect(this.owner).checkERC20(_mockERC20Instance.address);

            expect(result).to.equal(true);
        });

        it('confirms non-ERC20s.', async function () {
            const result1 = await _specCheckerInstance.connect(this.owner).checkERC20(_testHarnessInstance.address);
            const result2 = await _specCheckerInstance.connect(this.owner).checkERC20(_specCheckerInstance.address);
            const result3 = await _specCheckerInstance.connect(this.owner).checkERC20(_mockERC1155Instance.address);

            expect(result1).to.equal(false);
            expect(result2).to.equal(false);
            expect(result3).to.equal(false);
        });

        it('can validate ERC721A as ERC721.', async function () {
            const result1 = await _specCheckerInstance.connect(this.owner).checkERC721(_mockERC721ABInstance.address);
            const result2 = await _specCheckerInstance
                .connect(this.owner)
                .checkERC721(_mockERC721GoodRoyaltiesInstance.address);

            expect(result1).to.equal(true);
            expect(result2).to.equal(true);
        });

        it('confirms non-ERC721s.', async function () {
            const result1 = await _specCheckerInstance.connect(this.owner).checkERC721(_testHarnessInstance.address);
            const result2 = await _specCheckerInstance.connect(this.owner).checkERC721(_specCheckerInstance.address);
            const result3 = await _specCheckerInstance.connect(this.owner).checkERC721(_mockERC1155Instance.address);

            expect(result1).to.equal(false);
            expect(result2).to.equal(false);
            expect(result3).to.equal(false);
        });

        it('can validate ERC1155s.', async function () {
            const result = await _specCheckerInstance.connect(this.owner).checkERC1155(_mockERC1155Instance.address);

            expect(result).to.equal(true);
        });

        it('confirms non-ERC1155s.', async function () {
            const result1 = await _specCheckerInstance.connect(this.owner).checkERC1155(_testHarnessInstance.address);
            const result2 = await _specCheckerInstance.connect(this.owner).checkERC1155(_specCheckerInstance.address);
            const result3 = await _specCheckerInstance.connect(this.owner).checkERC1155(_mockERC721ABInstance.address);

            expect(result1).to.equal(false);
            expect(result2).to.equal(false);
            expect(result3).to.equal(false);
        });

        it('can validate ERC2981s.', async function () {
            const result = await _specCheckerInstance
                .connect(this.owner)
                .checkERC2981(_mockERC721GoodRoyaltiesInstance.address);

            expect(result).to.equal(true);
        });

        it('confirms non-ERC2981s.', async function () {
            const result1 = await _specCheckerInstance.connect(this.owner).checkERC2981(_testHarnessInstance.address);
            const result2 = await _specCheckerInstance.connect(this.owner).checkERC2981(_specCheckerInstance.address);
            const result3 = await _specCheckerInstance.connect(this.owner).checkERC2981(_mockERC721ABInstance.address);

            expect(result1).to.equal(false);
            expect(result2).to.equal(false);
            expect(result3).to.equal(false);
        });

        it('Check Bad Implementations.', async function () {
            const resultBadAlpha721 = await _specCheckerInstance
                .connect(this.owner)
                .checkERC721(_mockERC721BadARoyaltiesInstance.address);
            expect(resultBadAlpha721).to.equal(true); // Should return true, since alpha lists 721 as a superclass last.

            const resultBadBeta721 = await _specCheckerInstance
                .connect(this.owner)
                .checkERC721(_mockERC721BadBRoyaltiesInstance.address);
            expect(resultBadBeta721).to.equal(false); // Should return false, since beta lists 721 as a superclass first.

            const resultBadAlpha2981 = await _specCheckerInstance
                .connect(this.owner)
                .checkERC2981(_mockERC721BadARoyaltiesInstance.address);
            expect(resultBadAlpha2981).to.equal(false); // Should return false, since alpha lists 2981 as a superclass first.

            const resultBadBeta2981 = await _specCheckerInstance
                .connect(this.owner)
                .checkERC2981(_mockERC721BadBRoyaltiesInstance.address);
            expect(resultBadBeta2981).to.equal(true); // Should return true, since beta lists 2981 as a superclass last.
        });
    });
});
