// Written by @NiftyMike | @NFTCulture. Copyright 2024. License: MIT.
// Based on Unknown version of Manifold.xyz interfaces, received from dev team.

import { ERC165 } from './makeInterfaceId';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MXYZ_FN_SIGNATURES: { [k: string]: any } = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MXYZ_INTERFACE_IDS: { [k: string]: any } = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MXYZ_INTERFACES: { [k: string]: any } = {
    LazyDelivery: ['deliver(uint40,address,uint256,uint24,uint256,address,uint256)'],
    LazyDeliveryMetadata: ['assetURI(uint256)'],
    PriceEngine: ['price(uint256,uint256,uint24)']
};

for (const k of Object.getOwnPropertyNames(MXYZ_INTERFACES)) {
    MXYZ_INTERFACE_IDS[k] = ERC165(MXYZ_INTERFACES[k]);
    let fnName = '';
    for (fnName of MXYZ_INTERFACES[k]) {
        // the interface id of a single function is equivalent to its function signature
        const interfaceId = ERC165([fnName]);
        //console.log(`Signature: [${fnName}] && InterfaceId: [${interfaceId}]`);

        MXYZ_FN_SIGNATURES[fnName] = interfaceId;
    }
}
