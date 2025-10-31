// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import '../utility/AuxHelper16.sol';
import '../utility/AuxHelper32.sol';

/**
 * @title AuxHelperTestHarness
 * @author @NiftyMike | @NFTCulture
 * @dev Mock for AuxHelper classes.
 */
contract AuxHelperTestHarness is AuxHelper32, AuxHelper16 {
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

    function pack16(
        uint16 left16,
        uint16 leftCenter16,
        uint16 rightCenter16,
        uint16 right16
    ) external pure returns (uint64) {
        return _pack16(left16, leftCenter16, rightCenter16, right16);
    }

    /**
     * External wrapper for use in unit tests, or for whatever.
     */
    function unpack16(
        uint64 aux
    ) external pure returns (uint16 left16, uint16 leftCenter16, uint16 rightCenter16, uint16 right16) {
        return _unpack16(aux);
    }
}
