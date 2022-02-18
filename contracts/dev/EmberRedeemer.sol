// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

/**
 * @title EmberRedeemer
 * @author @NiftyMike, NFT Culture


 * allow contract to receive erc721 and erc1155 tokens
 * allow someone to stake ember and receive a claim
  
  * claim can be used to claim a piece held by wallet
  * claim can be released to claim something different
  * can claim and withdraw in one function

* tokens deposited initially and periodically 
* round robin process to claim contested pieces // TODO
* if something is especially valuable it can go into the high value pool and then people can enter the pool, and we can hold a drawing for it.

 */
contract EmberRedeemer {
    address private _owner;

    constructor() {
        _owner = msg.sender;
    }

    modifier onlyOwner() {
        require(_owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    function executeRefunds(
        address[] memory addresses,
        uint256[] memory amounts
    ) external payable {
        require(addresses.length == amounts.length, "Unmatched arrays");

        uint256 idx;
        uint256 sendAmount;
        for (idx = 0; idx < amounts.length; idx++) {
            sendAmount += amounts[idx];
        }

        require(sendAmount == msg.value, "Not right amount to send");

        for (idx = 0; idx < amounts.length; idx++) {
            // send the money.
            payable(addresses[idx]).transfer(amounts[idx]);
        }
    }

    function tip() external payable {
        // Thank you.
    }

    function withdraw() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function destroy() external onlyOwner {
        selfdestruct(payable(_owner));
    }
}