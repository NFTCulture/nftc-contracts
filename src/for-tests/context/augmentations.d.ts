import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';

// augmentations.d.ts
declare module 'mocha' {
    export interface Context {
        owner: HardhatEthersSigner;
        addr1: HardhatEthersSigner;
        addr2: HardhatEthersSigner;
        addr3: HardhatEthersSigner;
        addrs: HardhatEthersSigner[];

        // Use any to allow behaviors to work with any typed contract
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        contractUnderTest: any;
    }
}
