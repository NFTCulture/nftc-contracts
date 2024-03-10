// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import 'erc721a/contracts/extensions/ERC721ABurnable.sol';

/**
 * @title MockERC721ABurnable
 * @author @NFTCulture
 * @dev A super simple mock implementation of an ERC721A contract with
 * the ERC721ABurnable extension implementation.
 */
contract MockERC721ABurnable is ERC721ABurnable {
    constructor() ERC721A('MockERC721ABurnable', 'M721AB') {}

    function mint(uint256 quantity) external payable {
        _mint(msg.sender, quantity);
    }
}
