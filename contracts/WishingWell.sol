
   
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./Token.sol";

// TODO - do not make it pausable, that is a bit dodgy and could 'accidentally' lock the tokens

/**
 * A contract which converts an ERC20 token (SFL/MATIC pair token) into Wishing Well (WW) Tokens
 * Whenever someone withdraws SFL from the game, a percentage gets placed into this Wishing Well. 
 * Every 3 days someone with WW tokens can claim their SFL from this contract
 * When you want to get your LP tokens back, you exchange the WW for the SFL/MATIC pair token
 */
contract WishingWell is ERC20, Ownable {
  using SafeMath for uint256;

    SunflowerLandToken token;
    ERC20 liquidityToken;

    uint private lockedPeriod = 60 * 60 * 24 * 3; // 3 days

    mapping(address => uint) updatedAt;

    constructor(SunflowerLandToken _token, ERC20 _liquidityToken) payable ERC20("WishingWell", "WW") {
        token = _token;
        liquidityToken = _liquidityToken;
    }

    function setLockedPeriod(uint period) public onlyOwner {
        lockedPeriod = period;
    }

    /**
     * Throw in Liquidity token and get minted Wishing Well tokens
     * Requires the user 'approves' SFL before sending
     */
    function throwTokens(uint amount) public {
        updatedAt[msg.sender] = block.timestamp;

        bool transferred = liquidityToken.transferFrom(msg.sender, address(this), amount);
        require(transferred == true, "WishingWell: Transfer failed");

        _mint(msg.sender, amount);
    }

    /**
     * Every 3 days after depositing, collecting or withdrawing a user must wait
     * This acts as a 'locked' period
     */
    function canCollect(address account) public view returns (bool) {
        // Just an extra safeguard
        if (balanceOf(account) == 0) {
            return false;
        }

        uint lastOpenDate = updatedAt[account];

        uint threeDaysAgo = block.timestamp.sub(lockedPeriod); 
        return lastOpenDate < threeDaysAgo;
    }

    /**
     * How 'lucky' a user is
     * Depending on your WW balance, depends how much SFL you can claim
     */
    function searchWell(address account) private view returns (uint amount) {        
        uint balance = balanceOf(account);

        if (balance == 0) {
            return 0;
        }

        uint tokensInWell = token.balanceOf(address(this));

        // Give them their portion
        return tokensInWell.mul(balance).div(totalSupply());
    }

    /**
     * Grabs any SFL lying in the well
     */
    function collectFromWell() public {
        require (canCollect(msg.sender), "WishingWell: Good things come for those who wait");
        updatedAt[msg.sender] = block.timestamp;
        uint amount = searchWell(msg.sender);
        require(amount > 0, "WishingWell: Nothing today");

        
        token.transfer(msg.sender, amount);
    }

    /**
     * Take out your LP tokens
     * Once you extract, you must wait 3 days again
     */
    function takeOut(uint amount) public {
        require (canCollect(msg.sender), "WishingWell: Wait 3 days after throwing in or collecting");

        updatedAt[msg.sender] = block.timestamp;

        _burn(msg.sender, amount);

        bool transferred = liquidityToken.transfer(msg.sender, amount);
        require(transferred == true, "WishingWell: Transfer failed");
    }

    function lastUpdatedAt(address account) public view returns (uint) {
        return updatedAt[account];
    }
}
