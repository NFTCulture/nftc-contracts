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

export async function getDefaultHardhatAddresses(): Promise<string[]> {
    const signers = await hre.ethers.getSigners();
    const addresses = [signers[0].address, signers[1].address, signers[2].address];

    return addresses;
}
