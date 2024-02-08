// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

// Local References
import '../../interfaces/manifoldxyz/ILazyDelivery.sol';
import '../../interfaces/manifoldxyz/ILazyDeliveryMetadata.sol';
import '../../interfaces/manifoldxyz/IPriceEngine.sol';

// OZ Libraries
import '@openzeppelin/contracts/utils/introspection/ERC165Checker.sol';

/**
 * @title NFTSpecCheckerManifold
 * @author @NiftyMike | @NFTCulture
 * @dev Functionality to check a deployed contract against a list of Manifold specs.
 */
contract NFTSpecCheckerManifold {
    using ERC165Checker for address;

    /// @dev See {ERC165Checker-supportsInterface}
    ///> 0x01ffc9a7
    bytes4 constant _ERC165_CONTRACT = type(IERC165).interfaceId;

    /// @dev See {ERC165Checker-supportsInterface}
    ///> 0x8fb5170e
    bytes4 constant _ILAZYDELIVERY_CONTRACT = type(ILazyDelivery).interfaceId;
    ///> 0xf1c68982
    bytes4 constant _ILAZYDELIVERY_METADATA_CONTRACT = type(ILazyDeliveryMetadata).interfaceId;
    ///> 0x8e027244
    bytes4 constant _IPRICEENGINE_CONTRACT = type(IPriceEngine).interfaceId;

    function checkLazyDelivery(address targetContract) external view returns (bool) {
        return _checkContract(targetContract, _ILAZYDELIVERY_CONTRACT);
    }

    function getLazyDeliveryCode() external pure returns (string memory) {
        return bytes4ToString(_ILAZYDELIVERY_CONTRACT);
    }

    function checkLazyDeliveryMetadata(address targetContract) external view returns (bool) {
        return _checkContract(targetContract, _ILAZYDELIVERY_METADATA_CONTRACT);
    }

    function getLazyDeliveryMetadataCode() external pure returns (string memory) {
        return bytes4ToString(_ILAZYDELIVERY_METADATA_CONTRACT);
    }

    function checkPriceEngine(address targetContract) external view returns (bool) {
        return _checkContract(targetContract, _IPRICEENGINE_CONTRACT);
    }

    function getPriceEngineCode() external pure returns (string memory) {
        return bytes4ToString(_IPRICEENGINE_CONTRACT);
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
