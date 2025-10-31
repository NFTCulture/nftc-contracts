# Package -- @nftculture/nftc-contracts

## IMPORTANT NOTE
As of 12/13/2022, this repo has been renamed from "nftc-open-contracts" to "nftc-contracts". Please start using package version 1.3.0 or later.


## Version -- 2.1.0
**Solidity Compiler Upgrade & Dependency Cleanup**
- Upgraded Solidity compiler from v0.8.21 to v0.8.30
- Updated 27 contract files with hardcoded pragma statements
- All 97 tests passing with new compiler version
- Custom compiler subtask temporarily disabled to allow Hardhat auto-download
- Removed unused dependencies: `solmate` and `operator-filter-registry` (code is vendored)
- Updated documentation (docs/dependencies.md, CLAUDE.md)

## Version -- 2.0.0
**Major Upgrade: Ethers v6 Migration**
- Upgraded ethers from v5.7.2 to v6.15.0
- Upgraded hardhat from v2.18.1 to v2.26.5
- Upgraded @nomicfoundation/hardhat-toolbox from v2.0.2 to v6.1.0 (includes working hardhat-verify)
- Upgraded TypeScript from v5.2.2 to v5.9.3
- Upgraded @typescript-eslint packages from v5.51.0 to v8.46.2
- Upgraded Solidity compiler from v0.8.21 to v0.8.30
- **Breaking Changes**:
  - All test files migrated to ethers v6 API (`.deployed()` → `.waitForDeployment()`, `.address` → `await .getAddress()`)
  - Signer type changed from `SignerWithAddress` to `HardhatEthersSigner`
  - Import paths changed from `@nomiclabs/*` to `@nomicfoundation/*`
- Removed @defi-wonderland/smock (no ethers v6 support)
  - Enhanced MockDelegationRegistry with setMockDelegation() function
  - Tests now use Hardhat's hardhat_setCode for mock injection
- Updated all test files to use TypeChain-generated types for proper type checking
- Fixed ESLint no-explicit-any errors with proper TypeScript types (FunctionFragment from ethers)
- Added comprehensive dependency documentation in docs/dependencies.md
- Staying on Hardhat 2.x (not upgrading to Hardhat 3)
- All 97 tests passing with new dependency versions

## Version -- 1.5.next [Not published]
- TODO

## Version -- 1.5.22
- Add Scripty.sol interfaces.

## Version -- 1.5.21
- Add ERC20 interfaces to the OZ Interface definition 
- also write supports interface test for ERC20_165 Mock.
- Add manifold version of shouldSupportsInterface unit test generator.

## Version -- 1.5.20
- Implement ERC165 compliant version of ERC20.
- Update the NFTSpecChecker and tests.

## Version -- 1.5.19
- package lock cleanup
- add internal getter to erc7572 impl.

## Version -- 1.5.18
- Add manifold marketplace API interfaces
- Create a new version of nftc spec checker just for manifold stuff, and implement tests.

## Version -- 1.5.17
- attempt to improve erc7572 implementation.
- add additional unit tests to nft spec checker to validate interface codes
- add ERC7572 compliance to nftspecchecker

## Version -- 1.5.16
- alter internal method signature in contract metadata class.

## Version -- 1.5.15
- Update OZ version to 4.9.5
- Implement basic ERC7572 contract metadata base class and tests.

## Version -- 1.5.14
- Implement shared 1155URI tests.

## Version -- 1.5.13
- Implement shared baseURI tests.
- Improved Test Titles
- add sinon for mocking stuff, not sure if will use it yet. want to stay in sync with other nftc projects

## Version -- 1.5.12
- disable some non-concerning "any" linting warnings.
- refactor folder structure of tests, to make separate homes for solidity vs. typescript.

## Version -- 1.5.11
- Improve skipIfDefault check.

## Version -- 1.5.10
- Add mocha helpers
- another round of test cleanups

## Version -- 1.5.9
- Fix missing dist folder.

## Version -- 1.5.8
- Attempt to auto-deploy via Github

## Version -- 1.5.7
- Update license for 2023
- update to typescript 5.2.2
- cleanups to nftspecchecker test
- add another value for ERC1155MetadataURI to OZ Interfaces

## Version -- 1.5.6
- add exists method for ERC721SolBaseSupply

## Version -- 1.5.5
- Unit tests for 721SolBase
- Add CI build and test github actions.

## Version -- 1.5.4
- Yet another ERC721SolBase improvement.

## Version -- 1.5.3
- Tiny tweak to ERC721SolBaseSupply variable sizes.

## Version -- 1.5.2
- Improve behavior of ERC721SolBaseSupply and add totalMinted tracking.
- tiny hardhat config cleanups.

## Version -- 1.5.1
- Add ERC721Metadata to 721 supports interfaces checks.

## Version -- 1.5.0
- Bump version to pick up tiny HardhatHelpers fix, and linted code.

## Version -- 1.4.9 (Not published)
- Apply linting and formatting changes.

## Version -- 1.4.8
- Clean before build with shx, to prevent stale files showing up in package.
- Use create-ts-index util to generate index files so typescript module works properly.
- Rework/cleanup of build steps.
- small bug fix to HardhatHelpers
- Plug in ESLint checks and Prettier formatting as a build step (but don't run yet)
- Tighten up tsconfig strict settings.

## Version -- 1.4.7
- SupportsInterface introspection tests now validate that appropriate functions exist to match ERC721 spec.
- Implemented basic ERC165 checks for 721OZ, 721A and 721SolBase

## Version -- 1.4.6 (Not published)
- Finish first pass at getting library hooks to work.

## Version -- 1.4.5 (Not published)
- A minor conversion to typechain typings in test template and others.

## Version -- 1.4.4
- Move dependencies to dev-dependencies.
- clean up some comments.
- ERC721SolBaseBurnable: make sure to enforce caller approval checks
- Add ERC721SolBaseSupply - ERC721SolBase extension that tracks totalSupply.
- Package typescript code into library.
- refactor NFTSpecChecker folder structure
- refactor token folder structures
- Add introspection util typescript code

## Version -- 1.4.3
- Implement ERC721SolBaseBurnable extension contract.
- Refactor of external ERC721 contracts into their own dedicated folders under the /token top level folder.

## Version -- 1.4.2
- Add Solbase ERC721 since it isn't distributed via package managers (aka node)
- Big non-impactful comment cleanup.

## Version -- 1.4.1
- Bump minor dependencies
- Include license in package
- Start changelog