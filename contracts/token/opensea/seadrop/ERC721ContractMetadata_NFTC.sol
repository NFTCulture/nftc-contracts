// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {ERC721ABurnable, ERC721A, IERC721A, IERC721ABurnable} from 'erc721a/contracts/extensions/ERC721ABurnable.sol';

import {ISeaDropTokenContractMetadata} from './interfaces/ISeaDropTokenContractMetadata.sol';

import {IERC165} from '@openzeppelin/contracts/utils/introspection/IERC165.sol';

abstract contract ERC721ContractMetadata_NFTC is ERC721ABurnable, ISeaDropTokenContractMetadata {
    /// @notice Track the base URI for token metadata.
    string _tokenBaseURI;

    /// @notice Track the contract URI for contract metadata.
    string _contractURI;

    /// @notice Track the max supply.
    uint256 _maxSupply;

    /// @notice Track the provenance hash for guaranteeing metadata order
    ///         for random reveals.
    bytes32 _provenanceHash;

    constructor(string memory name, string memory symbol) ERC721A(name, symbol) {}

    /**
     * @notice Returns whether the interface is supported.
     *
     * @param interfaceId The interface id to check against.
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721A, IERC165, IERC721A) returns (bool) {
        return
            interfaceId == type(IERC721A).interfaceId ||
            interfaceId == type(IERC721ABurnable).interfaceId ||
            interfaceId == type(ISeaDropTokenContractMetadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function _isOwner() internal view virtual;

    /**
     * @notice Sets the base URI for the token metadata and emits an event.
     *
     * @param newBaseURI The new base URI to set.
     */
    function setBaseURI(string calldata newBaseURI) external override {
        // Ensure the sender is only the owner or contract itself.
        _isOwner();

        // Set the new base URI.
        _tokenBaseURI = newBaseURI;

        // Emit an event with the update.
        if (totalSupply() != 0) {
            emit BatchMetadataUpdate(1, _nextTokenId() - 1);
        }
    }

    /**
     * @notice Sets the contract URI for contract metadata.
     *
     * @param newContractURI The new contract URI.
     */
    function setContractURI(string calldata newContractURI) external override {
        // Ensure the sender is only the owner or contract itself.
        _isOwner();

        // Set the new contract URI.
        _contractURI = newContractURI;

        // Emit an event with the update.
        emit ContractURIUpdated(newContractURI);
    }

    /**
     * @notice Sets the max token supply and emits an event.
     *
     * @param newMaxSupply The new max supply to set.
     */
    function setMaxSupply(uint256 newMaxSupply) external {
        // Ensure the sender is only the owner or contract itself.
        _isOwner();

        // Ensure the max supply does not exceed the maximum value of uint64.
        if (newMaxSupply > 2 ** 64 - 1) {
            revert CannotExceedMaxSupplyOfUint64(newMaxSupply);
        }

        // Ensure the max supply does not exceed the total minted.
        if (newMaxSupply < _totalMinted()) {
            revert NewMaxSupplyCannotBeLessThenTotalMinted(newMaxSupply, _totalMinted());
        }

        // Set the new max supply.
        _maxSupply = newMaxSupply;

        // Emit an event with the update.
        emit MaxSupplyUpdated(newMaxSupply);
    }

    /**
     * @notice Sets the provenance hash and emits an event.
     *
     *         The provenance hash is used for random reveals, which
     *         is a hash of the ordered metadata to show it has not been
     *         modified after mint started.
     *
     *         This function will revert after the first item has been minted.
     *
     * @param newProvenanceHash The new provenance hash to set.
     */
    function setProvenanceHash(bytes32 newProvenanceHash) external {
        // Ensure the sender is only the owner or contract itself.
        _isOwner();

        // Revert if any items have been minted.
        if (_totalMinted() > 0) {
            revert ProvenanceHashCannotBeSetAfterMintStarted();
        }

        // Keep track of the old provenance hash for emitting with the event.
        bytes32 oldProvenanceHash = _provenanceHash;

        // Set the new provenance hash.
        _provenanceHash = newProvenanceHash;

        // Emit an event with the update.
        emit ProvenanceHashUpdated(oldProvenanceHash, newProvenanceHash);
    }

    /**
     * @notice Not supported
     */
    function setRoyaltyInfo(RoyaltyInfo calldata) external {}

    /**
     * @notice Not supported
     */
    function royaltyInfo(uint256, uint256) external view returns (address, uint256) {}

    /**
     * @notice Returns the base URI for token metadata.
     */
    function baseURI() external view override returns (string memory) {
        return _baseURI();
    }

    /**
     * @notice Returns the base URI for the contract, which ERC721A uses
     *         to return tokenURI.
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return _tokenBaseURI;
    }

    /**
     * @notice Returns the contract URI for contract metadata.
     */
    function contractURI() external view override returns (string memory) {
        return _contractURI;
    }

    /**
     * @notice Returns the max token supply.
     */
    function maxSupply() public view returns (uint256) {
        return _maxSupply;
    }

    /**
     * @notice Returns the provenance hash.
     *         The provenance hash is used for random reveals, which
     *         is a hash of the ordered metadata to show it is unmodified
     *         after mint has started.
     */
    function provenanceHash() external view override returns (bytes32) {
        return _provenanceHash;
    }

    /**
     * @notice Not supported
     */
    function royaltyAddress() external pure returns (address) {
        return address(0);
    }

    /**
     * @notice Not supported
     */
    function royaltyBasisPoints() external pure returns (uint256) {
        return 0;
    }

    /**
     * @dev Internal pure function to cast a `bool` value to a `uint256` value.
     *
     * @param b The `bool` value to cast.
     *
     * @return u The `uint256` value.
     */
    function _cast(bool b) internal pure returns (uint256 u) {
        assembly {
            u := b
        }
    }
}
