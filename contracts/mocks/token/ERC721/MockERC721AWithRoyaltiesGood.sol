// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import 'erc721a/contracts/ERC721A.sol';
import '@openzeppelin/contracts/token/common/ERC2981.sol';

/**
 * @title MockERC721AWithRoyaltiesGood
 */
contract MockERC721AWithRoyaltiesGood is ERC721A, ERC2981 {
    constructor() ERC721A('MockERC721AWithRoyaltiesGood', 'M721AWRG') {}

    function mint(uint256 quantity) external payable {
        _mint(msg.sender, quantity);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721A, ERC2981) returns (bool) {
        // Supports both interfaces properly.
        return ERC721A.supportsInterface(interfaceId) || ERC2981.supportsInterface(interfaceId);
    }
}
