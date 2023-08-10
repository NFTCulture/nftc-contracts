// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// OZ Libraries
import '@openzeppelin/contracts/utils/Context.sol';

// NFTC Open Source Contracts (https://github.com/NFTCulture/nftc-contracts/tree/main)
import '../ERC721.sol';

/**
 * @title ERC721SolBaseSupply
 * @author @NiftyMike | @NFTCulture
 *
 * @dev ERC721 SolBase extension to enable tracking of valid totalSupply.
 *
 * NOTE: Not a full ERC721Enumerable implementation.
 */
abstract contract ERC721SolBaseSupply is ERC721 {
    uint256 internal existingTokenCount;

    /**
     * @dev See {IERC721Enumerable-totalSupply}.
     */
    function totalSupply() public view virtual returns (uint256) {
        return existingTokenCount;
    }

    function transferFrom(address from, address to, uint256 tokenId) public virtual override {
        super.transferFrom(from, to, tokenId);

        if (from == address(0)) {
            existingTokenCount++;
        }

        if (to == address(0)) {
            existingTokenCount--;
        }
    }

    function _mint(address to, uint256 tokenId) internal virtual override {
        super._mint(to, tokenId);

        existingTokenCount++;
    }

    function _burn(uint256 tokenId) internal virtual override {
        super._burn(tokenId);

        existingTokenCount--;
    }

    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _ownerOf[tokenId] != address(0);
    }
}
