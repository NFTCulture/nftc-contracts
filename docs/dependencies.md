# NFTCulture Contracts - Dependency Reference

**Version:** 2.1.0 | **Updated:** 2025-10-30

Use these exact versions in your `package.json` to align with nftc-contracts.

## Required Dependencies

```json
{
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox": "^6.1.0",
    "@openzeppelin/contracts": "^4.9.5",
    "@types/sinon": "^17.0.2",
    "@typescript-eslint/eslint-plugin": "^8.46.2",
    "@typescript-eslint/parser": "^8.46.2",
    "chai": "^4.3.7",
    "chalk": "^4.1.2",
    "create-ts-index": "^1.14.0",
    "dotenv": "^16.3.1",
    "erc721a": "^4.2.3",
    "eslint": "^8.34.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-eslint-comments": "^3.2.0",
    "eslint-plugin-import": "^2.26.0",
    "ethers": "^6.15.0",
    "hardhat": "^2.26.5",
    "hardhat-contract-sizer": "^2.10.0",
    "keccak256": "^1.0.6",
    "npm-run-all": "^4.1.5",
    "open-cli": "^7.1.0",
    "operator-filter-registry": "^1.4.2",
    "prettier": "^2.8.8",
    "prettier-plugin-solidity": "^1.1.3",
    "shx": "^0.3.4",
    "sinon": "^17.0.1",
    "solmate": "^6.7.0",
    "typescript": "^5.9.3",
    "web3": "^1.10.0",
    "web3-utils": "^4.0.3"
  }
}
```

## Important Notes

- **Hardhat 2.x required** - NOT upgrading to Hardhat 3
- **Ethers v6** - Breaking change from v5
- **TypeScript 5.9.3** - requires typescript-eslint ^8.x
- **DO NOT install** packages included in hardhat-toolbox separately
- **Removed:** @defi-wonderland/smock (no ethers v6 support)

## Ethers v5 → v6 Breaking Changes

| v5 | v6 |
|---|---|
| `await contract.deployed()` | `await contract.waitForDeployment()` |
| `contract.address` | `await contract.getAddress()` |
| `@nomiclabs/hardhat-ethers/signers` | `@nomicfoundation/hardhat-ethers/signers` |
| `SignerWithAddress` | `HardhatEthersSigner` |

## Solidity Compiler

- **Current:** 0.8.30
- **Note:** Upgraded from 0.8.21 - all tests passing
