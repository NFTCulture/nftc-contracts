// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

// NFTC Open Source Contracts See: https://github.com/NFTCulture/nftc-contracts
import './ERC2981_NFTCExtended.sol';
import './NFTCPaymentSplitter.sol';

/**
 * @title ERC2981_NFTCExtended
 * @author @NiftyMike, NFT Culture
 * @dev One stop shop for Payment Splits and ERC2981 Royalty Definition.
 */
abstract contract NFTCSplitsAndRoyalties is ERC2981_NFTCExtended, NFTCPaymentSplitter {
    constructor(
        address[] memory __addresses,
        uint256[] memory __splits,
        address defaultRoyaltyReceiver,
        uint96 defaultRoyaltyBasisPoints
    )
        ERC2981_NFTCExtended(defaultRoyaltyReceiver, defaultRoyaltyBasisPoints)
        NFTCPaymentSplitter(__addresses, __splits)
    {
        // Nothing to do.
    }
 
    function _isOwner() internal view virtual override(ERC2981_NFTCExtended, NFTCPaymentSplitter);
}
