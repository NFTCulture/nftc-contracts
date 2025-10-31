// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import '../../financial/NFTCSplitsAndRoyalties.sol';

// OZ Libraries
import '@openzeppelin/contracts/access/Ownable.sol';

contract NFTCSplitsAndRoyaltiesMock is NFTCSplitsAndRoyalties, Ownable {
    uint96 private constant DEFAULT_ROYALTY_BASIS_POINTS = 999;

    constructor(
        address[] memory addresses,
        uint256[] memory splits
    ) payable NFTCSplitsAndRoyalties(addresses, splits, address(this), DEFAULT_ROYALTY_BASIS_POINTS) {
        // Implementation version: 1
    }

    function _isOwner() internal view override {
        _checkOwner();
    }
}
