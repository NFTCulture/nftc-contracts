// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import '../financial/NFTCSplitsAndRoyalties.sol';

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';

contract MockERC1155WithRoyalties is ERC1155, NFTCSplitsAndRoyalties, Ownable {
    uint96 private constant DEFAULT_ROYALTY_BASIS_POINTS = 999;

    constructor(
        address[] memory addresses,
        uint256[] memory splits
    )
        payable
        ERC1155('https://nftculture.mypinata.com/ipfs/Qm000000/{id}.json')
        NFTCSplitsAndRoyalties(addresses, splits, address(this), DEFAULT_ROYALTY_BASIS_POINTS)
    {}

    function mint(uint256 itemId, uint256 quantity) public {
        _mint(msg.sender, itemId, quantity, '');
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, ERC2981) returns (bool) {
        // Supports both interfaces properly.
        return ERC1155.supportsInterface(interfaceId) || ERC2981.supportsInterface(interfaceId);
    }

    // function _msgSender() internal view virtual override(Context) returns (address) {
    //     return msg.sender;
    // }

    // function _msgData() internal view virtual override(Context) returns (bytes calldata) {
    //     return msg.data;
    // }

    function _isOwner() internal view override {
        _checkOwner();
    }
}
