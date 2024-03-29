// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import 'erc721a/contracts/ERC721A.sol';
import '../../../financial/ERC2981_NFTCExtended.sol';

/**
 * @title MockERC721AWithRoyaltiesExtended
 */
contract MockERC721AWithRoyaltiesExtended is ERC721A, ERC2981_NFTCExtended, Ownable {
    uint96 private constant DEFAULT_ROYALTY_BASIS_POINTS = 999;

    constructor() ERC721A('MockERC721AWithRoyaltiesExtended', 'M721AWRE') {
        _setDefaultRoyalty(address(this), DEFAULT_ROYALTY_BASIS_POINTS);
    }

    function mint(uint256 quantity) external payable {
        _mint(msg.sender, quantity);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721A, ERC2981) returns (bool) {
        // Supports both interfaces properly.
        return ERC721A.supportsInterface(interfaceId) || ERC2981.supportsInterface(interfaceId);
    }

    function _isOwner() internal view override {
        _checkOwner();
    }
}
