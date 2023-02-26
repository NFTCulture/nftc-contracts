// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import '../security/NFTCDelegateEnforcer.sol';

/**
 * @title MockNFTCDelegateEnforcer
 * @author NFT Culture
 */
contract MockNFTCDelegateEnforcer is NFTCDelegateEnforcer {
    function getOperatorFromDelegation(
        address caller,
        address coldWallet,
        address targetContract,
        uint256 theToken
    ) external view returns (address) {
        return _getOperatorFromDelegation(caller, coldWallet, targetContract, theToken);
    }
}
