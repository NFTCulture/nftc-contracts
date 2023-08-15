import hre from 'hardhat';

export function addHardhatSignersToContext() {
    beforeEach('Copy Hardhat Wallets To Context...', async function () {
        try {
            const [owner, addr1, addr2, addr3, ...addrs] = await hre.ethers.getSigners();

            this.owner = owner;
            this.addr1 = addr1;
            this.addr2 = addr2;
            this.addr3 = addr3;
            this.addrs = addrs;
        } catch (ex) {
            console.log('An Error occurred...');
            console.log(ex);
        }
    });
}
