const { expect } = require('chai');
const hre = require('hardhat');
const keccak256 = require('keccak256');

require('dotenv').config();

const TESTHARNESS_CONTRACT_NAME = 'TemplateTestHarness';
const SPEC_CHECKER_CONTRACT_NAME = 'NFTSpecChecker';
const MOCK_E20_CONTRACT_NAME = 'MockERC20';
const MOCK_E721AB_CONTRACT_NAME = 'MockERC721ABurnable';
const MOCK_E1155_CONTRACT_NAME = 'MockERC1155';

const MOCK_E721GoodRoyalties_CONTRACT_NAME = 'MockERC721AWithRoyaltiesGood';
const MOCK_E721BadARoyalties_CONTRACT_NAME = 'MockERC721AWithRoyaltiesBadAlpha';
const MOCK_E721BadBRoyalties_CONTRACT_NAME = 'MockERC721AWithRoyaltiesBadBeta';

// Start test block
describe(`${TESTHARNESS_CONTRACT_NAME} Unit Tests`, function () {
    before(async function () {
        this.testHarnessContractFactory = await hre.ethers.getContractFactory(TESTHARNESS_CONTRACT_NAME);
        this.specCheckerContractFactory = await hre.ethers.getContractFactory(SPEC_CHECKER_CONTRACT_NAME);
        this.mockERC20ContractFactory = await hre.ethers.getContractFactory(MOCK_E20_CONTRACT_NAME);
        this.mockERC721ABContractFactory = await hre.ethers.getContractFactory(MOCK_E721AB_CONTRACT_NAME);
        this.mockERC1155ContractFactory = await hre.ethers.getContractFactory(MOCK_E1155_CONTRACT_NAME);

        this.mockERC721GoodRoyaltiesContractFactory = await hre.ethers.getContractFactory(
            MOCK_E721GoodRoyalties_CONTRACT_NAME
        );
        this.mockERC721BadARoyaltiesContractFactory = await hre.ethers.getContractFactory(
            MOCK_E721BadARoyalties_CONTRACT_NAME
        );
        this.mockERC721BadBRoyaltiesContractFactory = await hre.ethers.getContractFactory(
            MOCK_E721BadBRoyalties_CONTRACT_NAME
        );
    });

    beforeEach(async function () {
        [owner, addr1, addr2, addr3, ...addrs] = await hre.ethers.getSigners();

        this.testHarnessInstance = await this.testHarnessContractFactory.deploy();
        this.specCheckerInstance = await this.specCheckerContractFactory.deploy();
        this.mockERC20Instance = await this.mockERC20ContractFactory.deploy();
        this.mockERC721ABInstance = await this.mockERC721ABContractFactory.deploy();
        this.mockERC1155Instance = await this.mockERC1155ContractFactory.deploy();

        await this.testHarnessInstance.deployed();
        await this.specCheckerInstance.deployed();
        await this.mockERC20Instance.deployed();
        await this.mockERC721ABInstance.deployed();
        await this.mockERC1155Instance.deployed();

        this.mockERC721GoodRoyaltiesInstance = await this.mockERC721GoodRoyaltiesContractFactory.deploy();
        this.mockERC721BadARoyaltiesInstance = await this.mockERC721BadARoyaltiesContractFactory.deploy();
        this.mockERC721BadBRoyaltiesInstance = await this.mockERC721BadBRoyaltiesContractFactory.deploy();

        await this.mockERC721GoodRoyaltiesInstance.deployed();
        await this.mockERC721BadARoyaltiesInstance.deployed();
        await this.mockERC721BadBRoyaltiesInstance.deployed();
    });

    context('Test Group 1', function () {
        it('Test Case 1', async function () {
            console.log('Init Tests');
        });
    });

    context('Standard ERC20 and NFT Token Interface Checks', function () {
        it('Can validate ERC20s.', async function () {
            this.skip();
            // NOTE: Technically OZ ERC20 doesn't implement ERC165. Hopefully at some point they fix this.

            let result = await this.specCheckerInstance.connect(owner).checkERC20(this.mockERC20Instance.address);

            expect(result).to.equal(true);
        });

        it('Non ERC20s return false.', async function () {
            let result1 = await this.specCheckerInstance.connect(owner).checkERC20(this.testHarnessInstance.address);
            let result2 = await this.specCheckerInstance.connect(owner).checkERC20(this.specCheckerInstance.address);
            let result3 = await this.specCheckerInstance.connect(owner).checkERC20(this.mockERC1155Instance.address);

            expect(result1).to.equal(false);
            expect(result2).to.equal(false);
            expect(result3).to.equal(false);
        });

        it('Can validate ERC721As.', async function () {
            let result1 = await this.specCheckerInstance.connect(owner).checkERC721(this.mockERC721ABInstance.address);
            let result2 = await this.specCheckerInstance
                .connect(owner)
                .checkERC721(this.mockERC721GoodRoyaltiesInstance.address);

            expect(result1).to.equal(true);
            expect(result2).to.equal(true);
        });

        it('Non ERC721As return false.', async function () {
            let result1 = await this.specCheckerInstance.connect(owner).checkERC721(this.testHarnessInstance.address);
            let result2 = await this.specCheckerInstance.connect(owner).checkERC721(this.specCheckerInstance.address);
            let result3 = await this.specCheckerInstance.connect(owner).checkERC721(this.mockERC1155Instance.address);

            expect(result1).to.equal(false);
            expect(result2).to.equal(false);
            expect(result3).to.equal(false);
        });

        it('Can validate ERC1155s.', async function () {
            let result = await this.specCheckerInstance.connect(owner).checkERC1155(this.mockERC1155Instance.address);

            expect(result).to.equal(true);
        });

        it('Non ERC1155s return false.', async function () {
            let result1 = await this.specCheckerInstance.connect(owner).checkERC1155(this.testHarnessInstance.address);
            let result2 = await this.specCheckerInstance.connect(owner).checkERC1155(this.specCheckerInstance.address);
            let result3 = await this.specCheckerInstance.connect(owner).checkERC1155(this.mockERC721ABInstance.address);

            expect(result1).to.equal(false);
            expect(result2).to.equal(false);
            expect(result3).to.equal(false);
        });

        it('Can validate ERC2981s.', async function () {
            let result = await this.specCheckerInstance
                .connect(owner)
                .checkERC2981(this.mockERC721GoodRoyaltiesInstance.address);

            expect(result).to.equal(true);
        });

        it('Non ERC2981s return false.', async function () {
            let result1 = await this.specCheckerInstance.connect(owner).checkERC2981(this.testHarnessInstance.address);
            let result2 = await this.specCheckerInstance.connect(owner).checkERC2981(this.specCheckerInstance.address);
            let result3 = await this.specCheckerInstance.connect(owner).checkERC2981(this.mockERC721ABInstance.address);

            expect(result1).to.equal(false);
            expect(result2).to.equal(false);
            expect(result3).to.equal(false);
        });

        it('Check Bad Implementations.', async function () {
            let resultBadAlpha721 = await this.specCheckerInstance
                .connect(owner)
                .checkERC721(this.mockERC721BadARoyaltiesInstance.address);
            expect(resultBadAlpha721).to.equal(true); // Should return true, since alpha lists 721 as a superclass last.

            let resultBadBeta721 = await this.specCheckerInstance
                .connect(owner)
                .checkERC721(this.mockERC721BadBRoyaltiesInstance.address);
            expect(resultBadBeta721).to.equal(false); // Should return false, since beta lists 721 as a superclass first.

            let resultBadAlpha2981 = await this.specCheckerInstance
                .connect(owner)
                .checkERC2981(this.mockERC721BadARoyaltiesInstance.address);
            expect(resultBadAlpha2981).to.equal(false); // Should return false, since alpha lists 2981 as a superclass first.

            let resultBadBeta2981 = await this.specCheckerInstance
                .connect(owner)
                .checkERC2981(this.mockERC721BadBRoyaltiesInstance.address);
            expect(resultBadBeta2981).to.equal(true); // Should return true, since beta lists 2981 as a superclass last.
        });
    });
});
