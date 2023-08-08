// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '../ERC721.sol';

/**
 * @title ERC721SolBaseBurnable
 * @author @NiftyMike | @NFTCulture
 *
 * @dev ERC721 SolBase token that can be irreversibly burned (destroyed).
 */
abstract contract ERC721SolBaseBurnable is ERC721 {
    /**
     * @dev Burns `tokenId`. See {ERC721-_burn}.
     *
     * Requirements:
     *
     * - The caller must own `tokenId`.
     */
    function burn(uint256 tokenId) public virtual {
        _burn(tokenId);
    }
}
