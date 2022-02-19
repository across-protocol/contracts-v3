// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.0;

import "./Base_Adapter.sol";
import "../interfaces/AdapterInterface.sol";
import "../interfaces/WETH9.sol";

import "@uma/core/contracts/common/implementation/Lockable.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ArbitrumL1InboxLike {
    function createRetryableTicket(
        address destAddr,
        uint256 arbTxCallValue,
        uint256 maxSubmissionCost,
        address submissionRefundAddress,
        address valueRefundAddress,
        uint256 maxGas,
        uint256 gasPriceBid,
        bytes calldata data
    ) external payable returns (uint256);
}

interface ArbitrumL1ERC20GatewayLike {
    function outboundTransfer(
        address _token,
        address _to,
        uint256 _amount,
        uint256 _maxGas,
        uint256 _gasPriceBid,
        bytes calldata _data
    ) external payable returns (bytes memory);
}

contract Arbitrum_Adapter is Base_Adapter, Lockable {
    // Gas limit for immediate L2 execution attempt (can be estimated via NodeInterface.estimateRetryableTicket).
    // NodeInterface precompile interface exists at L2 address 0x00000000000000000000000000000000000000C8
    uint32 public l2GasLimit = 5_000_000;

    // Amount of ETH allocated to pay for the base submission fee. The base submission fee is a parameter unique to
    // retryable transactions; the user is charged the base submission fee to cover the storage costs of keeping their
    // ticket’s calldata in the retry buffer. (current base submission fee is queryable via
    // ArbRetryableTx.getSubmissionPrice). ArbRetryableTicket precompile interface exists at L2 address
    // 0x000000000000000000000000000000000000006E.
    uint256 public l2MaxSubmissionCost = 0.1e18;

    // L2 Gas price bid for immediate L2 execution attempt (queryable via standard eth*gasPrice RPC)
    uint256 public l2GasPrice = 10e9; // 10 gWei

    // This address on L2 receives extra ETH that is left over after relaying a message via the inbox.
    address public l2RefundL2Address;

    ArbitrumL1InboxLike public l1Inbox;

    ArbitrumL1ERC20GatewayLike public l1ERC20Gateway;

    event L2GasLimitSet(uint32 newL2GasLimit);

    event L2MaxSubmissionCostSet(uint256 newL2MaxSubmissionCost);

    event L2GasPriceSet(uint256 newL2GasPrice);

    event L2RefundL2AddressSet(address newL2RefundL2Address);

    constructor(
        address _hubPool,
        ArbitrumL1InboxLike _l1ArbitrumInbox,
        ArbitrumL1ERC20GatewayLike _l1ERC20Gateway
    ) Base_Adapter(_hubPool) {
        l1Inbox = _l1ArbitrumInbox;
        l1ERC20Gateway = _l1ERC20Gateway;

        l2RefundL2Address = owner();
    }

    function setL2GasLimit(uint32 _l2GasLimit) public onlyOwner {
        l2GasLimit = _l2GasLimit;
        emit L2GasLimitSet(l2GasLimit);
    }

    function setL2MaxSubmissionCost(uint256 _l2MaxSubmissionCost) public onlyOwner {
        l2MaxSubmissionCost = _l2MaxSubmissionCost;
        emit L2MaxSubmissionCostSet(l2MaxSubmissionCost);
    }

    function setL2GasPrice(uint256 _l2GasPrice) public onlyOwner {
        l2GasPrice = _l2GasPrice;
        emit L2GasPriceSet(l2GasPrice);
    }

    function setL2RefundL2Address(address _l2RefundL2Address) public onlyOwner {
        l2RefundL2Address = _l2RefundL2Address;
        emit L2RefundL2AddressSet(l2RefundL2Address);
    }

    // todo: try making this delegate call
    function relayMessage(address target, bytes memory message) external payable override nonReentrant onlyHubPool {
        uint256 requiredL1CallValue = getL1CallValue();
        require(address(this).balance >= requiredL1CallValue, "Insufficient ETH balance");

        l1Inbox.createRetryableTicket{ value: requiredL1CallValue }(
            target, // destAddr destination L2 contract address
            0, // l2CallValue call value for retryable L2 message
            l2MaxSubmissionCost, // maxSubmissionCost Max gas deducted from user's L2 balance to cover base submission fee
            l2RefundL2Address, // excessFeeRefundAddress maxgas x gasprice - execution cost gets credited here on L2 balance
            l2RefundL2Address, // callValueRefundAddress l2Callvalue gets credited here on L2 if retryable txn times out or gets cancelled
            l2GasLimit, // maxGas Max gas deducted from user's L2 balance to cover L2 execution
            l2GasPrice, // gasPriceBid price bid for L2 execution
            message // data ABI encoded data of L2 message
        );

        emit MessageRelayed(target, message);
    }

    function relayTokens(
        address l1Token,
        address l2Token, // l2Token is unused for Arbitrum.
        uint256 amount,
        address to
    ) external payable override nonReentrant onlyHubPool {
        l1ERC20Gateway.outboundTransfer(l1Token, to, amount, l2GasLimit, l2GasPrice, "");
        emit TokensRelayed(l1Token, l2Token, amount, to);
    }

    function getL1CallValue() public view returns (uint256) {
        return l2MaxSubmissionCost + l2GasPrice * l2GasLimit;
    }

    receive() external payable {}
}
