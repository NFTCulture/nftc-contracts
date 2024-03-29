// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import '../interfaces/IDelegationRegistry.sol';

/**
 * @title MockDelegationRegistry
 * @author @NFTCulture
 */
contract MockDelegationRegistry is IDelegationRegistry {
    function delegateForAll(address delegate, bool value) external override {}

    function delegateForContract(address delegate, address contract_, bool value) external override {}

    function delegateForToken(address delegate, address contract_, uint256 tokenId, bool value) external override {}

    function revokeAllDelegates() external override {}

    function revokeDelegate(address delegate) external override {}

    function revokeSelf(address vault) external override {}

    function getDelegationsByDelegate(address delegate) external view override returns (DelegationInfo[] memory) {}

    function getDelegatesForAll(address vault) external view override returns (address[] memory) {}

    function getDelegatesForContract(
        address vault,
        address contract_
    ) external view override returns (address[] memory) {}

    function getDelegatesForToken(
        address vault,
        address contract_,
        uint256 tokenId
    ) external view override returns (address[] memory) {}

    function getContractLevelDelegations(
        address vault
    ) external view override returns (ContractDelegation[] memory delegations) {}

    function getTokenLevelDelegations(
        address vault
    ) external view override returns (TokenDelegation[] memory delegations) {}

    function checkDelegateForAll(address delegate, address vault) external view override returns (bool) {}

    function checkDelegateForContract(
        address delegate,
        address vault,
        address contract_
    ) external view override returns (bool) {}

    function checkDelegateForToken(
        address delegate,
        address vault,
        address contract_,
        uint256 tokenId
    ) external view override returns (bool) {}
}
