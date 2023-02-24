// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

/**
 * @title MockERC20
 * @author NFT Culture
 */
contract MockERC20 is ERC20 {
    uint256 private immutable TOTAL_SUPPLY;

    constructor() ERC20('MockERC20', 'M20') {
        TOTAL_SUPPLY = 1000000000;
    }
}
