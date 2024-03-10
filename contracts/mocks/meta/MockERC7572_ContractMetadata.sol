// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

// Local References
import '../../meta/ERC7572_ContractMetadata.sol';

// OZ Libraries
import '@openzeppelin/contracts/access/Ownable.sol';

// Error Codes
error CallerIsNotOwner();

/**
 * @title MockERC7572_ContractMetadata
 * @author @NiftyMike | @NFTCulture
 * @dev Mock for ERC7572_ContractMetadata
 */
contract MockERC7572_ContractMetadata is ERC7572_ContractMetadata, Ownable {
    constructor() {
        // Implementation version: 1
    }

    function _isOwner() internal view virtual override {
        // Same as _checkOwner() but using error code instead of a require statement.
        if (owner() != _msgSender()) revert CallerIsNotOwner();
    }
}
