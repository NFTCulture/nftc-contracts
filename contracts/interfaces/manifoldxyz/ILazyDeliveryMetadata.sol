// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

/**
 * Metadata for lazy delivery tokens
 */
interface ILazyDeliveryMetadata {
    function assetURI(uint256 assetId) external view returns (string memory);
}
