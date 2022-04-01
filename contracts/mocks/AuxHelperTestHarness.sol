// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import '../utility/AuxHelper32.sol';

/**
 * @title AuxHelper32TestHarness
 * @author @NiftyMike | NFT Culture
 * @dev Mock for AuxHelper classes.
 */
contract AuxHelperTestHarness is AuxHelper32 {
    /**
     * External wrapper for use in unit tests, or for whatever.
     */
    function pack32(uint32 left32, uint32 right32) external pure returns (uint64) {
        return _pack32(left32, right32);
    }

    /**
     * External wrapper for use in unit tests, or for whatever.
     */
    function unpack32(uint64 aux) external pure returns (uint32 left32, uint32 right32) {
        return _unpack32(aux);
    }
}
