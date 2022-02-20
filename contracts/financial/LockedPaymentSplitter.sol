// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "./SlimPaymentSplitter.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title LockedPaymentSplitter
 * @author @NiftyMike, NFT Culture
 * @dev A wrapper around SlimPaymentSplitter which adds on security elements.
 *
 * Based on OpenZeppelin Contracts v4.4.1 (finance/PaymentSplitter.sol)
 */
abstract contract LockedPaymentSplitter is SlimPaymentSplitter, Ownable {
    event PayeeTransferred(address oldOwner, address newOwner);

    mapping(address => uint256) private _shares;
    address[] private _payees;

    /**
     * @dev Overrides release() method, so that it can only be called by owner.
     * @notice Owner: Release funds to a specific address.
     *
     * @param account Payable address that will receive funds.
     */
    function release(address payable account) public override onlyOwner {
        super.release(account);
    }

    /**
     * @dev Triggers a transfer to caller's address of the amount of Ether they are owed, according to their percentage of the
     * total shares and their previous withdrawals.
     * @notice Sender: request payment.
     */
    function releaseToSelf() public {
        super.release(payable(msg.sender));
    }

    /**
     * @dev Allows owner to transfer their shares to somebody else; it can only be called by of a share.
     * @notice Owner: Release funds to a specific address.
     *
     * @param newOwner Payable address which has no shares and will receive the shares of the current owner.
     */
    function transferPayee(address payable newOwner) public {
        require(newOwner != address(0), "PaymentSplitter: New payee is the zero address.");
        require(shares(msg.sender) > 0, "PaymentSplitter: You have no shares.");
        require(
            shares(newOwner) == 0, // why not _shares[newOwner] ??
            "PaymentSplitter: New payee already has shares."
        );

        _changePayee(newOwner);
        emit PayeeTransferred(msg.sender, newOwner);
    }

    function _changePayee(address newOwner) private {
        if (_payees.length == 0) return;

        for (uint i = 0; i < _payees.length - 1; i++) {
            if (_payees[i] == msg.sender) {
                _payees[i] = newOwner;
                // how to correctly update shares?
                _shares[newOwner] = shares(msg.sender);
                _shares[msg.sender] = 0;
                // i keep getting old values from .shares()
            }
        }
    }
}
