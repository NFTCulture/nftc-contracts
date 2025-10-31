// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';

contract MockERC1155ConfigurableURI is ERC1155 {
    constructor(string memory __URI) ERC1155(__URI) {}

    function mint(uint256 itemId, uint256 quantity) public {
        _mint(msg.sender, itemId, quantity, '');
    }
}
