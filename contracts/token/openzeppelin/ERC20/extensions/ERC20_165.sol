// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';

/**
 * @title ERC20_165
 * @author @NiftyMike | @NFTCulture
 * @dev ERC20 with ERC165 support tacked on, for consistency with more modern ERC specs.
 */
abstract contract ERC20_165 is ERC20, ERC165 {
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return
            interfaceId == type(IERC20).interfaceId ||
            interfaceId == type(IERC20Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
