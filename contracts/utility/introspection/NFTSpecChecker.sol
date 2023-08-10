// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

// OZ Libraries
import '@openzeppelin/contracts/interfaces/IERC2981.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165Checker.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol';
import '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol';

/**
 * @title NFTSpecChecker
 * @author @NiftyMike | @NFTCulture
 * @dev Functionality to check a deployed contract against a list of common NFT related specs.
 *
 * Special thanks to netdragonx and Bored Box for assistance with this code.
 */
contract NFTSpecChecker {
    using ERC165Checker for address;

    /// @dev See {ERC165Checker-supportsInterface}
    ///> 0x36372b07
    bytes4 constant _ERC20_CONTRACT = type(IERC20).interfaceId;
    bytes4 constant _ERC20_CONTRACT_METADATA = type(IERC20Metadata).interfaceId;

    /// @dev See {ERC165Checker-supportsInterface}
    ///> 0x80ac58cd
    bytes4 constant _ERC721_CONTRACT = type(IERC721).interfaceId;
    bytes4 constant _ERC721_CONTRACT_METADATA = type(IERC721Metadata).interfaceId;

    /// @dev See {ERC165Checker-supportsInterface}
    ///> 0xd9b67a26
    bytes4 constant _ERC1155_CONTRACT = type(IERC1155).interfaceId;
    bytes4 constant _ERC1155_CONTRACT_METADATA_URI = type(IERC1155MetadataURI).interfaceId;

    /// @dev See {ERC165Checker-supportsInterface}
    ///> 0x2a55205a
    bytes4 constant _ERC2981_ROYALTIES = type(IERC2981).interfaceId;

    function checkERC20(address targetContract) external view returns (bool) {
        return
            _checkContract(targetContract, _ERC20_CONTRACT) && _checkContract(targetContract, _ERC20_CONTRACT_METADATA);
    }

    function checkERC721(address targetContract) external view returns (bool) {
        return
            _checkContract(targetContract, _ERC721_CONTRACT) &&
            _checkContract(targetContract, _ERC721_CONTRACT_METADATA);
    }

    function checkERC1155(address targetContract) external view returns (bool) {
        return
            _checkContract(targetContract, _ERC1155_CONTRACT) &&
            _checkContract(targetContract, _ERC1155_CONTRACT_METADATA_URI);
    }

    function checkERC2981(address targetContract) external view returns (bool) {
        return _checkContract(targetContract, _ERC2981_ROYALTIES);
    }

    function _checkContract(address _contract, bytes4 interfaceId) internal view returns (bool) {
        if (_contract.supportsInterface(interfaceId)) {
            return true;
        } else {
            return false;
        }
    }
}
