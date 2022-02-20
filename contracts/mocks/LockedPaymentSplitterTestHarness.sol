// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "../financial/LockedPaymentSplitter.sol";

contract LockedPaymentSplitterTestHarness is LockedPaymentSplitter {
    constructor(address[] memory __payees, uint256[] memory __shares)
        payable SlimPaymentSplitter(
            __payees,
            __shares
        )
    {
        // Implementation version: 1
    }
}