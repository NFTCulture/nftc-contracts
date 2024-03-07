// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

///////////////////////////////////////////////////////////
// ░██████╗░█████╗░██████╗░██╗██████╗░████████╗██╗░░░██╗ //
// ██╔════╝██╔══██╗██╔══██╗██║██╔══██╗╚══██╔══╝╚██╗░██╔╝ //
// ╚█████╗░██║░░╚═╝██████╔╝██║██████╔╝░░░██║░░░░╚████╔╝░ //
// ░╚═══██╗██║░░██╗██╔══██╗██║██╔═══╝░░░░██║░░░░░╚██╔╝░░ //
// ██████╔╝╚█████╔╝██║░░██║██║██║░░░░░░░░██║░░░░░░██║░░░ //
// ╚═════╝░░╚════╝░╚═╝░░╚═╝╚═╝╚═╝░░░░░░░░╚═╝░░░░░░╚═╝░░░ //
///////////////////////////////////////////////////////////

/**
 * @title IScriptyStorageProviderV2
 * @author @NiftyMike | @NFTCulture
 * @dev An interface wrapper for a ScriptStorage contract, when we only need to read data from it.
 * @dev Special thanks to @0xthedude and @xtremetom for providing this library.
 * See: https://github.com/intartnft/scripty.sol
 */
interface IScriptyStorageProviderV2 {
    /**
     * @notice Get the full content
     * @param name - Name given to the content. Eg: threejs.min.js_r148
     * @param data - Arbitrary data. Not used by this contract.
     * @return content - Full content from merged chunks
     */
    function getContent(string memory name, bytes memory data) external view returns (bytes memory content);

    /**
     * @notice Get content's chunk pointer list
     * @param name - Name given to the content. Eg: threejs.min.js_r148
     * @return pointers - List of pointers
     */
    function getContentChunkPointers(string memory name) external view returns (address[] memory pointers);
}
