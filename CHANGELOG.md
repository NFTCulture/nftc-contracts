# Package -- @nftculture/nftc-contracts

## IMPORTANT NOTE
As of 12/13/2022, this repo has been renamed from "nftc-open-contracts" to "nftc-contracts". Please start using package version 1.3.0 or later.



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