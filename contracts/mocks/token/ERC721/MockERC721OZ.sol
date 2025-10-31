// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

/**
 * @title MockERC721OZ
 * @author @NFTCulture
 * @dev This is just a super straightforward implementation of OZ's ERC721, with some
 * common extensions added in. Much like what you would get from the OZ
 * code gen site: https://www.openzeppelin.com/contracts
 */
contract MockERC721OZ is ERC721, ERC721Enumerable, ERC721Burnable, Ownable {
    constructor() ERC721('MockERC721', 'MTK') {}

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
