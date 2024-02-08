// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

interface IPriceEngine {
    /**
     *  @dev Determine price of an asset given the number
     *  already minted.
     */
    function price(uint256 assetId, uint256 alreadyMinted, uint24 count) external view returns (uint256);
}
