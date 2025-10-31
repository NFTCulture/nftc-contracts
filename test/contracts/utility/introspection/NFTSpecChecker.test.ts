import { expect } from 'chai';
import * as dotenv from 'dotenv';
import hre from 'hardhat';

import { addHardhatSignersToContext } from '../../../../src';
import {
    TemplateTestHarness,
    TemplateTestHarness__factory,
    NFTSpecChecker,
    NFTSpecChecker__factory,
    MockERC20_165,
    MockERC20_165__factory,
    MockERC721ABurnable,
    MockERC721ABurnable__factory,
    MockERC1155,
    MockERC1155__factory,
    MockERC721AWithRoyaltiesGood,
    MockERC721AWithRoyaltiesGood__factory,
    MockERC721AWithRoyaltiesBadAlpha,
    MockERC721AWithRoyaltiesBadAlpha__factory,
    MockERC721AWithRoyaltiesBadBeta,
    MockERC721AWithRoyaltiesBadBeta__factory,
    MockERC7572_ContractMetadata,
    MockERC7572_ContractMetadata__factory
} from '../../../../typechain-types';

dotenv.config();

const TESTHARNESS_CONTRACT_NAME = 'TemplateTestHarness';

let _testHarnessContractFactory: TemplateTestHarness__factory;
let _specCheckerContractFactory: NFTSpecChecker__factory;
let _mockERC20ContractFactory: MockERC20_165__factory;
let _mockERC721ABContractFactory: MockERC721ABurnable__factory;
let _mockERC1155ContractFactory: MockERC1155__factory;
let _mockERC721GoodRoyaltiesContractFactory: MockERC721AWithRoyaltiesGood__factory;
let _mockERC721BadARoyaltiesContractFactory: MockERC721AWithRoyaltiesBadAlpha__factory;
let _mockERC721BadBRoyaltiesContractFactory: MockERC721AWithRoyaltiesBadBeta__factory;
let _mockERC7572_ContractMetadataFactory: MockERC7572_ContractMetadata__factory;

let _testHarnessInstance: TemplateTestHarness;
let _specCheckerInstance: NFTSpecChecker;
let _mockERC20Instance: MockERC20_165;
let _mockERC721ABInstance: MockERC721ABurnable;
let _mockERC1155Instance: MockERC1155;
let _mockERC721GoodRoyaltiesInstance: MockERC721AWithRoyaltiesGood;
let _mockERC721BadARoyaltiesInstance: MockERC721AWithRoyaltiesBadAlpha;
let _mockERC721BadBRoyaltiesInstance: MockERC721AWithRoyaltiesBadBeta;
let _mockERC7572_ContractMetadataInstance: MockERC7572_ContractMetadata;

// Start test block
describe(`File:${__filename}\nContract: ${TESTHARNESS_CONTRACT_NAME}\n`, function () {
    before(async function () {
        _testHarnessContractFactory = await hre.ethers.getContractFactory("TemplateTestHarness");
        _specCheckerContractFactory = await hre.ethers.getContractFactory("NFTSpecChecker");
        _mockERC20ContractFactory = await hre.ethers.getContractFactory("MockERC20_165");
        _mockERC721ABContractFactory = await hre.ethers.getContractFactory("MockERC721ABurnable");
        _mockERC1155ContractFactory = await hre.ethers.getContractFactory("MockERC1155");
        _mockERC721GoodRoyaltiesContractFactory = await hre.ethers.getContractFactory("MockERC721AWithRoyaltiesGood");
        _mockERC721BadARoyaltiesContractFactory = await hre.ethers.getContractFactory("MockERC721AWithRoyaltiesBadAlpha");
        _mockERC721BadBRoyaltiesContractFactory = await hre.ethers.getContractFactory("MockERC721AWithRoyaltiesBadBeta");
        _mockERC7572_ContractMetadataFactory = await hre.ethers.getContractFactory("MockERC7572_ContractMetadata");
    });

    beforeEach(async function () {
        _testHarnessInstance = await _testHarnessContractFactory.deploy();
        _specCheckerInstance = await _specCheckerContractFactory.deploy();
        _mockERC20Instance = await _mockERC20ContractFactory.deploy();
        _mockERC721ABInstance = await _mockERC721ABContractFactory.deploy();
        _mockERC1155Instance = await _mockERC1155ContractFactory.deploy();

        await _testHarnessInstance.waitForDeployment();
        await _specCheckerInstance.waitForDeployment();
        await _mockERC20Instance.waitForDeployment();
        await _mockERC721ABInstance.waitForDeployment();
        await _mockERC1155Instance.waitForDeployment();

        _mockERC721GoodRoyaltiesInstance = await _mockERC721GoodRoyaltiesContractFactory.deploy();
        _mockERC721BadARoyaltiesInstance = await _mockERC721BadARoyaltiesContractFactory.deploy();
        _mockERC721BadBRoyaltiesInstance = await _mockERC721BadBRoyaltiesContractFactory.deploy();

        await _mockERC721GoodRoyaltiesInstance.waitForDeployment();
        await _mockERC721BadARoyaltiesInstance.waitForDeployment();
        await _mockERC721BadBRoyaltiesInstance.waitForDeployment();

        _mockERC7572_ContractMetadataInstance = await _mockERC7572_ContractMetadataFactory.deploy();
        await _mockERC7572_ContractMetadataInstance.waitForDeployment();
    });

    addHardhatSignersToContext();

    context('Spec Checker:', function () {
        it('uses valid interface codes', async function () {
            const [erc20Code, erc20MetadataCode] = await _specCheckerInstance.connect(this.owner).getERC20Codes();
            expect(erc20Code).to.equal('0x36372b07');
            expect(erc20MetadataCode).to.equal('0xa219a025');

            const [erc721Code, erc721MetadataCode] = await _specCheckerInstance.connect(this.owner).getERC721Codes();
            expect(erc721Code).to.equal('0x80ac58cd');
            expect(erc721MetadataCode).to.equal('0x5b5e139f');

            const [erc1155Code, erc1155MetadataCode] = await _specCheckerInstance.connect(this.owner).getERC1155Codes();
            expect(erc1155Code).to.equal('0xd9b67a26');
            expect(erc1155MetadataCode).to.equal('0x0e89341c');

            const erc2981Code = await _specCheckerInstance.connect(this.owner).getERC2981Code();
            expect(erc2981Code).to.equal('0x2a55205a');

            const erc7572Code = await _specCheckerInstance.connect(this.owner).getERC7572Code();
            expect(erc7572Code).to.equal('0xe8a3d485');
        });

        it('can validate ERC20s.', async function () {
            // NOTE: Technically OZ ERC20 doesn't implement ERC165. Hopefully at some point they fix this.
            const result = await _specCheckerInstance.connect(this.owner).checkERC20(await _mockERC20Instance.getAddress());

            expect(result).to.equal(true);
        });

        it('confirms non-ERC20s.', async function () {
            const result1 = await _specCheckerInstance.connect(this.owner).checkERC20(await _testHarnessInstance.getAddress());
            const result2 = await _specCheckerInstance.connect(this.owner).checkERC20(await _specCheckerInstance.getAddress());
            const result3 = await _specCheckerInstance.connect(this.owner).checkERC20(await _mockERC1155Instance.getAddress());

            expect(result1).to.equal(false);
            expect(result2).to.equal(false);
            expect(result3).to.equal(false);
        });

        it('can validate ERC721A as ERC721.', async function () {
            const result1 = await _specCheckerInstance.connect(this.owner).checkERC721(await _mockERC721ABInstance.getAddress());
            const result2 = await _specCheckerInstance
                .connect(this.owner)
                .checkERC721(await _mockERC721GoodRoyaltiesInstance.getAddress());

            expect(result1).to.equal(true);
            expect(result2).to.equal(true);
        });

        it('confirms non-ERC721s.', async function () {
            const result1 = await _specCheckerInstance.connect(this.owner).checkERC721(await _testHarnessInstance.getAddress());
            const result2 = await _specCheckerInstance.connect(this.owner).checkERC721(await _specCheckerInstance.getAddress());
            const result3 = await _specCheckerInstance.connect(this.owner).checkERC721(await _mockERC1155Instance.getAddress());

            expect(result1).to.equal(false);
            expect(result2).to.equal(false);
            expect(result3).to.equal(false);
        });

        it('can validate ERC1155s.', async function () {
            const result = await _specCheckerInstance.connect(this.owner).checkERC1155(await _mockERC1155Instance.getAddress());

            expect(result).to.equal(true);
        });

        it('confirms non-ERC1155s.', async function () {
            const result1 = await _specCheckerInstance.connect(this.owner).checkERC1155(await _testHarnessInstance.getAddress());
            const result2 = await _specCheckerInstance.connect(this.owner).checkERC1155(await _specCheckerInstance.getAddress());
            const result3 = await _specCheckerInstance.connect(this.owner).checkERC1155(await _mockERC721ABInstance.getAddress());

            expect(result1).to.equal(false);
            expect(result2).to.equal(false);
            expect(result3).to.equal(false);
        });

        it('can validate ERC2981s.', async function () {
            const result = await _specCheckerInstance
                .connect(this.owner)
                .checkERC2981(await _mockERC721GoodRoyaltiesInstance.getAddress());

            expect(result).to.equal(true);
        });

        it('confirms non-ERC2981s.', async function () {
            const result1 = await _specCheckerInstance.connect(this.owner).checkERC2981(await _testHarnessInstance.getAddress());
            const result2 = await _specCheckerInstance.connect(this.owner).checkERC2981(await _specCheckerInstance.getAddress());
            const result3 = await _specCheckerInstance.connect(this.owner).checkERC2981(await _mockERC721ABInstance.getAddress());

            expect(result1).to.equal(false);
            expect(result2).to.equal(false);
            expect(result3).to.equal(false);
        });

        it('Check Bad Implementations.', async function () {
            const resultBadAlpha721 = await _specCheckerInstance
                .connect(this.owner)
                .checkERC721(await _mockERC721BadARoyaltiesInstance.getAddress());
            expect(resultBadAlpha721).to.equal(true); // Should return true, since alpha lists 721 as a superclass last.

            const resultBadBeta721 = await _specCheckerInstance
                .connect(this.owner)
                .checkERC721(await _mockERC721BadBRoyaltiesInstance.getAddress());
            expect(resultBadBeta721).to.equal(false); // Should return false, since beta lists 721 as a superclass first.

            const resultBadAlpha2981 = await _specCheckerInstance
                .connect(this.owner)
                .checkERC2981(await _mockERC721BadARoyaltiesInstance.getAddress());
            expect(resultBadAlpha2981).to.equal(false); // Should return false, since alpha lists 2981 as a superclass first.

            const resultBadBeta2981 = await _specCheckerInstance
                .connect(this.owner)
                .checkERC2981(await _mockERC721BadBRoyaltiesInstance.getAddress());
            expect(resultBadBeta2981).to.equal(true); // Should return true, since beta lists 2981 as a superclass last.
        });

        it('can validate ERC7572s.', async function () {
            const result = await _specCheckerInstance
                .connect(this.owner)
                .checkERC7572(await _mockERC7572_ContractMetadataInstance.getAddress());

            expect(result).to.equal(true);
        });
    });
});
