// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

// OZ References
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';

// Local References
import '../../../interfaces/manifoldxyz/ILazyDelivery.sol';
import '../../../interfaces/manifoldxyz/ILazyDeliveryMetadata.sol';
import '../../../interfaces/manifoldxyz/IPriceEngine.sol';

/**
 * @title ManifoldClientMock
 * @author @NiftyMike | @NFTCulture
 * @dev Just an empty mock test harness for manifold.xyz interfaces.
 */
contract ManifoldClientMock is ILazyDelivery, ILazyDeliveryMetadata, IPriceEngine, ERC165 {
    constructor() {
        // Implementation version: 1
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        if (
            interfaceId == type(ILazyDelivery).interfaceId ||
            interfaceId == type(ILazyDeliveryMetadata).interfaceId ||
            interfaceId == type(IPriceEngine).interfaceId
        ) {
            return true;
        }

        return super.supportsInterface(interfaceId);
    }

    function deliver(
        uint40 listingId,
        address to,
        uint256 assetId,
        uint24 payableCount,
        uint256 payableAmount,
        address payableERC20,
        uint256 index
    ) external override {}

    function assetURI(uint256 assetId) external view override returns (string memory) {}

    function price(uint256 assetId, uint256 alreadyMinted, uint24 count) external view override returns (uint256) {}
}
