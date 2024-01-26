// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

/**
 * @title ERC7572_ContractMetadata
 * @author @NiftyMike | @NFTCulture
 * @dev A basic implementation of ERC-7572 for exposing contract-level metadata for
 * external marketplaces via IPFS. This approach can be used to provide out-of-the-box
 * pretty metadata on contract deployment.
 */
abstract contract ERC7572_ContractMetadata {
    string private _contractURI;

    /**
     * @dev return the contract URI.
     *
     * See: https://docs.opensea.io/docs/contract-level-metadata
     *
     * Three approaches:
     *
     * - Native IPFS Addressing: "ipfs://QmTNgv3jx2HHfBjQX9RnKtxj2xv2xQDtbVXoRi5rJ3a46e"
     * - Link to a JSON file: "https://external-link-url.com/my-contract-metadata.json"
     * - Encoded in Contract:
     *      string memory json = '{"name": "Opensea Creatures","description":"..."}';
     *      return string.concat("data:application/json;utf8,", json);
     */
    function contractURI() external view returns (string memory) {
        return _contractURI;
    }

    function setContractURI(string calldata __contractUri) external {
        _isOwner();

        _setContractURI(__contractUri);
    }

    function _setContractURI(string memory __contractUri) internal {
        _contractURI = __contractUri;
    }

    function _isOwner() internal view virtual;
}
