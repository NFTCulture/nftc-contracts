// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// ERC721 from Sol-DAO/solbase, Packaged within NFTC Open Source Libraries.
// See: https://github.com/NFTCulture/nftc-contracts/blob/main/contracts/token/solbase/ERC721/ERC721.sol
import '../../../token/solbase/ERC721/extensions/ERC721SolBaseBurnable.sol';
import '../../../token/solbase/ERC721/extensions/ERC721SolBaseSupply.sol';

// OZ Libraries
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

/**
 * @title MockERC721SolBase
 * @author @NFTCulture
 * @dev This is just a super straightforward implementation of SolBase's ERC721, with some
 * common extensions added in.
 */
contract MockERC721SolBase is ERC721SolBaseBurnable, ERC721SolBaseSupply, Ownable {
    using Strings for uint256;

    string public baseURI;

    constructor(string memory __baseURI) ERC721('MockERC721SolBase', 'M721SB') {
        baseURI = __baseURI;
    }

    function transferFrom(address from, address to, uint256 tokenId) public override(ERC721, ERC721SolBaseSupply) {
        ERC721SolBaseSupply.transferFrom(from, to, tokenId);
    }

    function mint(address to, uint256 tokenId) public onlyOwner {
        _mint(to, tokenId);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), 'No token');

        string memory base = _getContractURI();
        require(bytes(base).length > 0, 'Base unset');

        return string(abi.encodePacked(base, _tokenFilename(tokenId)));
    }

    function _getContractURI() internal view returns (string memory) {
        return baseURI;
    }

    function _tokenFilename(uint256 tokenId) internal pure virtual returns (string memory) {
        return tokenId.toString();
    }
}
