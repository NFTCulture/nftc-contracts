import { Contract } from '@ethersproject/contracts';
import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

// augmentations.d.ts
declare module 'mocha' {
    export interface Context {
        owner: SignerWithAddress;
        addr1: SignerWithAddress;
        addr2: SignerWithAddress;
        addr3: SignerWithAddress;
        addrs: SignerWithAddress[];

        contractUnderTest: Contract;
    }
}
