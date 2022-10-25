// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import 'erc721a/contracts/extensions/ERC721ABurnable.sol';

/**
 * @title MockERC721ABurnable
 */
contract MockERC721ABurnable is ERC721ABurnable {
    constructor() ERC721A('MockERC721ABurnable', 'M721AB') {}

    function mint(uint256 quantity) external payable {
        _mint(msg.sender, quantity);
    }
}
