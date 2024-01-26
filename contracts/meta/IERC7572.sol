// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

/**
 * @title IERC7572
 * @author @NiftyMike | @NFTCulture
 * @dev This specification standardizes contractURI() to return contract-level metadata.
 *
 * @notice See: https://eips.ethereum.org/EIPS/eip-7572
 */
interface IERC7572 {
    function contractURI() external view returns (string memory);

    event ContractURIUpdated();
}
