// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';

contract MockERC1155 is ERC1155 {
    constructor() ERC1155('https://nftculture.mypinata.com/ipfs/Qm000000/{id}.json') {}

    function mint(uint256 itemId, uint256 quantity) public {
        _mint(msg.sender, itemId, quantity, '');
    }
}
