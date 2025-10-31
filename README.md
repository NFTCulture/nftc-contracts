# nftc-contracts

[![NFTC Contracts Continuous Integration](https://github.com/NFTCulture/nftc-contracts/actions/workflows/nftc-contracts-ci.yml/badge.svg)](https://github.com/NFTCulture/nftc-contracts/actions/workflows/nftc-contracts-ci.yml)

_Welcome to NFTCulture's Open Source Contract Repository!_

This library consists of work done by the NFT Culture development team, NFT Culture Labs,
that is being made available open source for use by anyone.

Feel free to reach out to us at https://discord.gg/nftculture, in 💾┃tech-and-dev-home channel.

## Dependency Reference

See [docs/dependencies.md](docs/dependencies.md) for the exact dependency versions to use in your project.

## Development Environment Setup
- [ ] An .env created from ./.env_proto is mandatory. Not all secrets need to be inserted, start w/ minimal amount.
- [ ] An .npmrc created from ./.npmrc_proto is mandatory. Need auth_token from Github.com, to access package from other projects.
- [ ] Node v16 or v18
- [ ] NPM v9
- [ ] NFTC Devs use VSCode, GitBash and Powershell on Windows. Most stuff is tested on Mac, but there might be issues.

## Common Dev Tasks:

1. Run the build
    > npm run build

2. Run the tests
    > npm run test

3. Run the tests and get a gas report
    > npm run test:gas 

4. Generate and view a test coverage report
    > npm run test:coverage && npm run test:coverage:view
