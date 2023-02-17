// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/common/ERC2981.sol';

/**
 * @title ERC2981_NFTCExtended
 * @author @NiftyMike, NFT Culture
 * @dev A wrapper around ERC2981 which adds some common functionality.
 */
abstract contract ERC2981_NFTCExtended is ERC2981, Ownable {
    constructor(address defaultReceiver, uint96 defaultRoyalty) {
        // Default royalty information to be this contract, so that no potential
        // royalty payments are missed by marketplaces that support ERC2981.
        _setDefaultRoyalty(defaultReceiver, defaultRoyalty);
    }

    function setDefaultRoyalty(address newReceiver, uint96 newRoyalty) external onlyOwner {
        _setDefaultRoyalty(newReceiver, newRoyalty);
    }
}
