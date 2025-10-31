// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import 'erc721a/contracts/ERC721A.sol';
import '@openzeppelin/contracts/token/common/ERC2981.sol';

/**
 * @title MockERC721AWithRoyaltiesBadBeta
 */
contract MockERC721AWithRoyaltiesBadBeta is ERC721A, ERC2981 {
    constructor() ERC721A('MockERC721AWithRoyaltiesBadBeta', 'M721AWRBB') {}

    function mint(uint256 quantity) external payable {
        _mint(msg.sender, quantity);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721A, ERC2981) returns (bool) {
        // Invalid, only supports ERC2981
        return super.supportsInterface(interfaceId);
    }
}
