//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface SpokePoolInterface {
    // This leaf is meant to be decoded in the SpokePool in order to pay out individual relayers for this bundle.
    struct RelayerRefundLeaf {
        // This is the amount to return to the HubPool. This occurs when there is a PoolRebalanceLeaf netSendAmount that is
        // negative. This is just that value inverted.
        uint256 amountToReturn;
        // This array designates how much each of those addresses should be refunded.
        uint256[] refundAmounts;
        // Used as the index in the bitmap to track whether this leaf has been executed or not.
        uint32 leafId;
        // Used to verify that this is being decoded on the correct chainId.
        uint32 chainId;
        // The associated L2TokenAddress that these claims apply to.
        address l2TokenAddress;
        // These two arrays must be the same length and are parallel arrays. They should be order by refundAddresses.
        // This array designates each address that must be refunded.
        address[] refundAddresses;
    }

    // This struct represents the data to fully-specify a relay. If any portion of this data differs, the relay is
    // considered to be completely distinct. Only one relay for a particular depositId, chainId pair should be
    // considered valid and repaid.
    struct RelayData {
        // The address that made the deposit on the origin chain.
        address depositor;
        // The recipient address on the destination chain.
        address recipient;
        // The corresponding token address on the destination chain.
        address destinationToken;
        // The total relay amount before fees are taken out.
        uint256 relayAmount;
        // The LP Fee percentage computed by the relayer based on the deposit's quote timestamp
        // and the HubPool's utilization.
        uint64 realizedLpFeePct;
        // The relayer fee percentage specified in the deposit.
        uint64 relayerFeePct;
        // The id uniquely identifying this deposit on the origin chain.
        uint32 depositId;
        // Origin chain id.
        uint32 originChainId;
    }

    function setCrossDomainAdmin(address newCrossDomainAdmin) external;

    function setHubPool(address newHubPool) external;

    function setEnableRoute(
        address originToken,
        uint256 destinationChainId,
        bool enable
    ) external;

    function setDepositQuoteTimeBuffer(uint32 buffer) external;

    function relayRootBundle(bytes32 relayerRefundRoot, bytes32 slowRelayRoot) external;
}
