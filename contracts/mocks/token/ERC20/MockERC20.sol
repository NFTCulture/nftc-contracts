// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import '../../../token/openzeppelin/ERC20/extensions/ERC20_165.sol';

/**
 * @title MockERC20_165
 * @author @NFTCulture
 */
contract MockERC20_165 is ERC20_165 {
    uint256 private immutable _maxSupply;

    constructor() ERC20('MockERC20_165', 'M20') {
        _maxSupply = 1000000000;
    }
}
