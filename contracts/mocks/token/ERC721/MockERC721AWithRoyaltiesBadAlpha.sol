// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import 'erc721a/contracts/ERC721A.sol';
import '@openzeppelin/contracts/token/common/ERC2981.sol';

/**
 * @title MockERC721AWithRoyaltiesBadAlpha
 */
contract MockERC721AWithRoyaltiesBadAlpha is ERC2981, ERC721A {
    constructor() ERC721A('MockERC721AWithRoyaltiesBadAlpha', 'M721AWRBA') {}

    function mint(uint256 quantity) external payable {
        _mint(msg.sender, quantity);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721A, ERC2981) returns (bool) {
        // Invalid, only supports ERC721A
        return super.supportsInterface(interfaceId);
    }
}
