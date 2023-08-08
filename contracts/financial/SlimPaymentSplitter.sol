// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

// NFTC Open Source Contracts See: https://github.com/NFTCulture/nftc-contracts
import './NFTCPaymentSplitterBase.sol';

/**
 * @title SlimPaymentSplitter
 * @author @NiftyMike | @NFTCulture
 * @dev Legacy implementation of SlimPaymentSplitter.
 *
 * Note: This class exists purely for backward compatibility in case anyone was using it.
 * Works exactly the same way as SlimPaymentSplitter did before the upgrade to use NFTCPaymentSplitterBase.
 *
 * Based on OpenZeppelin Contracts v4.8.0 (finance/PaymentSplitter.sol)
 */
contract SlimPaymentSplitter is NFTCPaymentSplitterBase {
    constructor(address[] memory payees, uint256[] memory shares_) NFTCPaymentSplitterBase(payees, shares_) {
        // Nothing to do
    }

    function release(address payable account) public virtual override {
        _release(account);
    }
}
