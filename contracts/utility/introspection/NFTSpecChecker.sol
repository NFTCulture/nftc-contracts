// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

// Local References
import '../../meta/IERC7572.sol';

// OZ Libraries
import '@openzeppelin/contracts/interfaces/IERC2981.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol';
import '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165Checker.sol';

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
    ///> 0x01ffc9a7
    bytes4 constant _ERC165_CONTRACT = type(IERC165).interfaceId;

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

    /// @dev See {ERC165Checker-supportsInterface}
    ///> 0xe8a3d485
    bytes4 constant _ERC7572_CONTRACT_URI = type(IERC7572).interfaceId;

    function checkERC20(address targetContract) external view returns (bool) {
        return
            _checkContract(targetContract, _ERC20_CONTRACT) && _checkContract(targetContract, _ERC20_CONTRACT_METADATA);
    }

    function getERC20Code() external pure returns (string memory) {
        return bytes4ToString(_ERC20_CONTRACT);
    }

    function checkERC721(address targetContract) external view returns (bool) {
        return
            _checkContract(targetContract, _ERC721_CONTRACT) &&
            _checkContract(targetContract, _ERC721_CONTRACT_METADATA);
    }

    function getERC721Code() external pure returns (string memory) {
        return bytes4ToString(_ERC721_CONTRACT);
    }

    function checkERC1155(address targetContract) external view returns (bool) {
        return
            _checkContract(targetContract, _ERC1155_CONTRACT) &&
            _checkContract(targetContract, _ERC1155_CONTRACT_METADATA_URI);
    }

    function getERC1155Code() external pure returns (string memory) {
        return bytes4ToString(_ERC1155_CONTRACT);
    }

    function checkERC2981(address targetContract) external view returns (bool) {
        return _checkContract(targetContract, _ERC2981_ROYALTIES);
    }

    function getERC2981Code() external pure returns (string memory) {
        return bytes4ToString(_ERC2981_ROYALTIES);
    }

    function checkERC7572(address targetContract) external view returns (bool) {
        return _checkContract(targetContract, _ERC7572_CONTRACT_URI);
    }

    function getERC7572Code() external pure returns (string memory) {
        return bytes4ToString(_ERC7572_CONTRACT_URI);
    }

    function _checkContract(address _contract, bytes4 interfaceId) internal view returns (bool) {
        if (_contract.supportsInterface(interfaceId)) {
            return true;
        } else {
            return false;
        }
    }

    function bytes4ToString(bytes4 _bytes) internal pure returns (string memory) {
        bytes memory byteArray = new bytes(8);
        for (uint256 i = 0; i < 4; i++) {
            uint8 currentByte = uint8(_bytes[i]);
            byteArray[i * 2] = toHexChar(currentByte / 16);
            byteArray[i * 2 + 1] = toHexChar(currentByte % 16);
        }
        return string(abi.encodePacked('0x', byteArray));
    }

    function toHexChar(uint8 _value) internal pure returns (bytes1) {
        if (_value < 10) {
            return bytes1(uint8(bytes1('0')) + _value);
        } else {
            return bytes1(uint8(bytes1('a')) + _value - 10);
        }
    }
}
