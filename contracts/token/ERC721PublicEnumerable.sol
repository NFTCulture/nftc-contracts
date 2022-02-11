// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (token/ERC721/extensions/ERC721Enumerable.sol) modified according to Pagzi Tech inc implementation.
// Note: OZ v4.4.1 is MIT license, Pagzi's ERC721P is GPL-3.0, so forced to use the more restrictive license scheme.
// DYOR but if you use this exact code you need to follow the same approach.
// Note 2: The methods provided by this implementation are sufficiently poor for onchain performance to the point that I think this
// is a bad implementation. If you are only going to use totalSupply() then i guess that is ok.

pragma solidity ^0.8.0;

import "./ERC721Public.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

/**
 * @title ERC721PublicEnumerable
 * @dev This implements an optional extension of {ERC721} defined in the EIP that adds
 * enumerability of all the token ids in the contract as well as all token ids owned by each
 * account.
 *
 * @author @NiftyMike, NFT Culture
 *
 * Note: does not implement Pagzi's tokenOfOwner() method.
 */
abstract contract ERC721PublicEnumerable is ERC721Public, IERC721Enumerable {
    uint256 private existingTokenCount;

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(IERC165, ERC721Public)
        returns (bool)
    {
        return
            interfaceId == type(IERC721Enumerable).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IERC721Enumerable-tokenOfOwnerByIndex}.
     *
     * Note: this will be costly if run on-chain.
     */
    function tokenOfOwnerByIndex(address owner, uint256 index)
        public
        view
        virtual
        override
        returns (uint256)
    {
        require(
            index < ERC721Public.balanceOf(owner),
            "ERC721PE: owner index out of bounds"
        );
        uint256 ownerTokenIdx;
        for (uint256 tokenId; tokenId < _owners.length; tokenId++) {
            if (_owners[tokenId] == owner) {
                if (ownerTokenIdx == index) return tokenId;
                else ownerTokenIdx++;
            }
        }

        revert("ERC721PE: unable to find token");
    }

    /**
     * @dev See {IERC721Enumerable-totalSupply}.
     *
     * Important note: the original Pagzi implementation did not account for burned tokens here, even though
     * it allowed burning of tokens. This actually resulted in an invalid implementation of IERC721Enumerable-totalSupply.
     *
     * I have attempted to fix this here, by tracking the number of tokens that are actively existing with existingTokenCount.
     */
    function totalSupply() public view virtual override returns (uint256) {
        return existingTokenCount;
    }

    /**
     * @dev See {IERC721Enumerable-tokenByIndex}.
     *
     * Note: this function had to be improved from Pagzi implementation to account for burning.
     * Also, it will be very costly to run on chain.
     */
    function tokenByIndex(uint256 index)
        public
        view
        virtual
        override
        returns (uint256)
    {
        require(
            index < existingTokenCount,
            "ERC721PE: global index out of bounds"
        );

        // Build on the fly array, equivalent to allTokens.
        uint256[] memory existingTokens = new uint256[](existingTokenCount);

        // Loop through all the minted token ids, and log all the ones that are still existing.
        uint256 tokenCounter;
        for (uint256 tokenId; tokenId < _owners.length; tokenId++) {
            if(_owners[tokenId] != address(0)){
                existingTokens[tokenCounter] = tokenId;
                tokenCounter ++;
            }
        }

        return existingTokens[index];
    }

    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, ``from``'s `tokenId` will be burned.
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId);

        if (from == address(0)) {
            existingTokenCount++;
        }

        if (to == address(0)) {
            existingTokenCount--;
        }
    }
}
