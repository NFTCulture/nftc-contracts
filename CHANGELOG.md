# Package -- @nftculture/nftc-contracts

## IMPORTANT NOTE
As of 12/13/2022, this repo has been renamed from "nftc-open-contracts" to "nftc-contracts". Please start using package version 1.3.0 or later.


## Version -- 1.5.next [Not published]
- TODO
- Improved Test Titles

## Version -- 1.5.14
- Implement shared 1155URI tests.

## Version -- 1.5.13
- Implement shared baseURI tests.

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