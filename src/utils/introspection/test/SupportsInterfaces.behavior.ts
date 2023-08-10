import { expect } from 'chai';
import hre from 'hardhat';
import type * as ethers from 'ethers';

const SPEC_CHECKER_CONTRACT_NAME = 'NFTSpecChecker';
let _specCheckerContractFactory: ethers.ContractFactory;

export function shouldSupportInterfaces(interfaces = []) {
    describe('SupportsInterfaces...', function () {
        before(async function () {
            _specCheckerContractFactory = (await hre.ethers.getContractFactory(
                SPEC_CHECKER_CONTRACT_NAME
            )) as ethers.ContractFactory;
        });

        beforeEach(async function () {
            expect(this).to.have.property('mockInstance'); // Must be set in caller
            expect(this).to.have.property('owner'); // Must be set in caller

            this.contractUnderTest = this.mockInstance;
            this.executor = this.owner;

            this._specCheckerInstance = await _specCheckerContractFactory.deploy();
            await this._specCheckerInstance.deployed();
        });

        it('Non-ERC20s return false.', async function () {
            const actualResult = await this._specCheckerInstance
                .connect(this.owner)
                .checkERC20(this.contractUnderTest.address);

            const isERC20 = interfaces.find((token) => token === 'ERC20');

            expect(actualResult).to.equal(isERC20);
        });
    });
}
