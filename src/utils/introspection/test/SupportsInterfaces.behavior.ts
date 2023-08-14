import { expect } from 'chai';
import hre from 'hardhat';

import { NFTSpecChecker, NFTSpecChecker__factory } from '../../../../typechain-types';

const SPEC_CHECKER_CONTRACT_NAME = 'NFTSpecChecker';

let _specCheckerContractFactory: NFTSpecChecker__factory;
let _specCheckerInstance: NFTSpecChecker;

export function shouldSupportInterfaces(interfaces: string[] = []) {
    describe('SupportsInterfaces...', function () {
        before(async function () {
            _specCheckerContractFactory = (await hre.ethers.getContractFactory(
                SPEC_CHECKER_CONTRACT_NAME
            )) as NFTSpecChecker__factory;
        });

        beforeEach(async function () {
            expect(this).to.have.property('mockInstance'); // Must be set in caller
            expect(this).to.have.property('owner'); // Must be set in caller

            this.contractUnderTest = this.mockInstance;
            this.executor = this.owner;

            _specCheckerInstance = await _specCheckerContractFactory.deploy();
            _specCheckerInstance.deployed();
        });

        it('Non-ERC20s return false.', async function () {
            const actualResult = await _specCheckerInstance
                .connect(this.owner)
                .checkERC20(this.contractUnderTest.address);

            const isERC20 = interfaces.find((token) => token === 'ERC20') !== undefined;

            expect(actualResult).to.equal(isERC20);
        });
    });
}
