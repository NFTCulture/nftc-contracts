// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import '../interfaces/IDelegationRegistry.sol';

error NotAuthorizedForDelegation();

/**
 * @title NFTCDelegateEnforcer
 * @author @NFTCulture
 * @dev Enforce requirements for Delegate wallets.
 *
 * NFTC's opinionated approach to enforcing delegation via Delegate.Cash.
 *
 * @notice Delegate.cash has some quirks, execute transactions using this
 * service at your own risk.
 */
abstract contract NFTCDelegateEnforcer {
    // See: https://github.com/delegatecash/delegation-registry
    IDelegationRegistry public constant DELEGATION_REGISTRY =
        IDelegationRegistry(0x00000000000076A84feF008CDAbe6409d2FE638B);

    function _getOperatorFromDelegation(
        address caller,
        address coldWallet,
        address targetContract,
        uint256 theToken
    ) internal view returns (address) {
        // Short circuits ...
        if (coldWallet == address(0) || coldWallet == caller) {
            // Cold wallet was not provided, or is same as caller.
            // So only caller is only authorized to act as the operator.
            return caller;
        }

        if (!DELEGATION_REGISTRY.checkDelegateForToken(caller, coldWallet, targetContract, theToken))
            revert NotAuthorizedForDelegation();

        // Caller is authorized to operate on behalf of coldWallet.
        return coldWallet;
    }
}
