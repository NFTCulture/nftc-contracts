// Using OZ 4.9.3
// Lifted from https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/test/utils/introspection/SupportsInterface.behavior.js
// NOTE: Some slight modifications to make it work better with Typescript.

import { ERC165 } from './makeInterfaceId';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const OZ_FN_SIGNATURES: { [k: string]: any } = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const OZ_INTERFACE_IDS: { [k: string]: any } = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const OZ_INTERFACES: { [k: string]: any } = {
    ERC165: ['supportsInterface(bytes4)'],
    ERC721: [
        'balanceOf(address)',
        'ownerOf(uint256)',
        'approve(address,uint256)',
        'getApproved(uint256)',
        'setApprovalForAll(address,bool)',
        'isApprovedForAll(address,address)',
        'transferFrom(address,address,uint256)',
        'safeTransferFrom(address,address,uint256)',
        'safeTransferFrom(address,address,uint256,bytes)'
    ],
    ERC721Enumerable: ['totalSupply()', 'tokenOfOwnerByIndex(address,uint256)', 'tokenByIndex(uint256)'],
    ERC721Metadata: ['name()', 'symbol()', 'tokenURI(uint256)'],
    ERC1155: [
        'balanceOf(address,uint256)',
        'balanceOfBatch(address[],uint256[])',
        'setApprovalForAll(address,bool)',
        'isApprovedForAll(address,address)',
        'safeTransferFrom(address,address,uint256,uint256,bytes)',
        'safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)'
    ],
    ERC1155MetadataURI: ['uri(uint256)'],
    ERC1155Receiver: [
        'onERC1155Received(address,address,uint256,uint256,bytes)',
        'onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)'
    ],
    AccessControl: [
        'hasRole(bytes32,address)',
        'getRoleAdmin(bytes32)',
        'grantRole(bytes32,address)',
        'revokeRole(bytes32,address)',
        'renounceRole(bytes32,address)'
    ],
    AccessControlEnumerable: ['getRoleMember(bytes32,uint256)', 'getRoleMemberCount(bytes32)'],
    AccessControlDefaultAdminRules: [
        'defaultAdminDelay()',
        'pendingDefaultAdminDelay()',
        'defaultAdmin()',
        'pendingDefaultAdmin()',
        'defaultAdminDelayIncreaseWait()',
        'changeDefaultAdminDelay(uint48)',
        'rollbackDefaultAdminDelay()',
        'beginDefaultAdminTransfer(address)',
        'acceptDefaultAdminTransfer()',
        'cancelDefaultAdminTransfer()'
    ],
    Governor: [
        'name()',
        'version()',
        'COUNTING_MODE()',
        'hashProposal(address[],uint256[],bytes[],bytes32)',
        'state(uint256)',
        'proposalThreshold()',
        'proposalSnapshot(uint256)',
        'proposalDeadline(uint256)',
        'proposalProposer(uint256)',
        'proposalEta(uint256)',
        'votingDelay()',
        'votingPeriod()',
        'quorum(uint256)',
        'getVotes(address,uint256)',
        'getVotesWithParams(address,uint256,bytes)',
        'hasVoted(uint256,address)',
        'propose(address[],uint256[],bytes[],string)',
        'queue(address[],uint256[],bytes[],bytes32)',
        'execute(address[],uint256[],bytes[],bytes32)',
        'cancel(address[],uint256[],bytes[],bytes32)',
        'castVote(uint256,uint8)',
        'castVoteWithReason(uint256,uint8,string)',
        'castVoteWithReasonAndParams(uint256,uint8,string,bytes)',
        'castVoteBySig(uint256,uint8,address,bytes)',
        'castVoteWithReasonAndParamsBySig(uint256,uint8,address,string,bytes,bytes)'
    ],
    ERC2981: ['royaltyInfo(uint256,uint256)']
};

for (const k of Object.getOwnPropertyNames(OZ_INTERFACES)) {
    OZ_INTERFACE_IDS[k] = ERC165(OZ_INTERFACES[k]);
    let fnName = '';
    for (fnName of OZ_INTERFACES[k]) {
        // the interface id of a single function is equivalent to its function signature
        const interfaceId = ERC165([fnName]);
        //console.log(`Signature: [${fnName}] && InterfaceId: [${interfaceId}]`);

        OZ_FN_SIGNATURES[fnName] = interfaceId;
    }
}
