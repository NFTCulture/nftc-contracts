// SPDX-License-Identifier: MIT
// Based on OpenZeppelin Contracts v4.4.1 (utils/Counters.sol)
pragma solidity ^0.8.11;

/**
 * @title MultiIncrementer
 * @author @NiftyMike | @NFTCulture
 * @dev Based on "Counters" by Matt Condon (@shrugs)
 *
 * Provides a counter that can only be incremented or reset.
 *
 * This version works similar to Counters.Counter, but allows increasing by a count instead of just by 1, which facilitates
 * cheaper NFT minting. Decrement wasnt implemented as that doesnt happen with NFTs (burning doesnt really decrease the
 * number originally minted).
 *
 * Include with `using Counter for MultiIncrementer.Counter;`
 */
library MultiIncrementer {
    struct Counter {
        // This variable should never be directly accessed by users of the library: interactions must be restricted to
        // the library's function. As of Solidity v0.5.2, this cannot be enforced, though there is a proposal to add
        // this feature: see https://github.com/ethereum/solidity/issues/4637
        uint256 _value; // default: 0
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter, uint256 count) internal {
        unchecked {
            counter._value += count;
        }
    }

    function reset(Counter storage counter) internal {
        counter._value = 0;
    }
}
