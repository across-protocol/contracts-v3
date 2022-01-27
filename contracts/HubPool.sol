// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.0;

import "./interfaces/BridgeAdminInterface.sol";

import "@uma/core/contracts/common/implementation/Testable.sol";
import "@uma/core/contracts/common/implementation/Lockable.sol";
import "@uma/core/contracts/common/implementation/MultiCaller.sol";
import "@uma/core/contracts/common/implementation/ExpandedERC20.sol";
import "@uma/core/contracts/oracle/interfaces/FinderInterface.sol";
import "@uma/core/contracts/oracle/interfaces/StoreInterface.sol";
import "@uma/core/contracts/oracle/implementation/Constants.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";

interface WETH9Like {
    function withdraw(uint256 wad) external;

    function deposit() external payable;
}

contract HubPool is Testable, Lockable, MultiCaller, Ownable {
    using SafeERC20 for IERC20;
    using Address for address;
    struct LPToken {
        ExpandedERC20 lpToken;
        bool isEnabled;
    }

    enum RefundRequestStatus {
        Pending,
        Finalized,
        Disputed
    }

    struct RelayerRefundRequest {
        bytes32 poolRebalanceProof;
        bytes32 destinationDistributionProof;
        RefundRequestStatus status;
    }

    RelayerRefundRequest[] public relayerRefundRequests;

    // Whitelist of origin token to destination token routings to be used by off-chain agents.
    mapping(address => mapping(uint256 => address)) public whitelistedRoutes;

    mapping(address => LPToken) public lpTokens; // Mapping of L1TokenAddress to the associated LPToken.

    // Address of L1Weth. Enable LPs to deposit/receive ETH, if they choose, when adding/removing liquidity.
    WETH9Like public l1Weth;

    // Address of the bridgeAdmin that is used to manage the hub.
    BridgeAdminInterface public bridgeAdmin;

    // Token used to bond the data worker for proposing relayer refund bundles.
    IERC20 public bondToken;

    // The bondToken's final fee from the UMA Store is scaled by this number to increase the bonding amount.
    uint64 public bondTokenFinalFeeMultiplier;

    // The computed bond amount as the UMA Store's final fee multiplied by the bondTokenFinalFeeMultiplier.
    uint256 public bondAmount;

    event BondMultiplierSet(uint64 newBondMultiplier);

    event BondTokenSet(address newBondMultiplier);

    event LiquidityAdded(
        address indexed l1Token,
        uint256 amount,
        uint256 lpTokensMinted,
        address indexed liquidityProvider
    );
    event LiquidityRemoved(
        address indexed l1Token,
        uint256 amount,
        uint256 lpTokensBurnt,
        address indexed liquidityProvider
    );
    event WhitelistRoute(address originToken, uint256 destinationChainId, address destinationToken);

    event RelayerRefundRequested(
        uint64 relayerRefundId,
        uint256[] bundleEvaluationBlockNumbers,
        bytes32 indexed poolRebalanceProof,
        bytes32 indexed destinationDistributionProof,
        address proposer
    );

    constructor(
        uint64 _bondTokenFinalFeeMultiplier,
        address _l1Weth,
        address _bridgeAdmin,
        address _bondToken,
        address _timerAddress
    ) Testable(_timerAddress) {
        bondTokenFinalFeeMultiplier = _bondTokenFinalFeeMultiplier;
        l1Weth = WETH9Like(_l1Weth);
        bridgeAdmin = BridgeAdminInterface(_bridgeAdmin);
        bondToken = IERC20(_bondToken);
    }

    /*************************************************
     *                ADMIN FUNCTIONS                *
     *************************************************/

    function setBondToken(address newBondToken) public onlyOwner {
        bondToken = IERC20(newBondToken);
        emit BondTokenSet(newBondToken);
    }

    function setBondTokenFinalFeeMultiplier(uint64 newBondTokenFinalFeeMultiplier) public onlyOwner {
        bondTokenFinalFeeMultiplier = newBondTokenFinalFeeMultiplier;
        emit BondMultiplierSet(newBondTokenFinalFeeMultiplier);
    }

    /**
     * @notice Whitelist an origin token <-> destination token route.
     */
    function whitelistRoute(
        address originToken,
        address destinationToken,
        uint256 destinationChainId
    ) public onlyOwner {
        whitelistedRoutes[originToken][destinationChainId] = destinationToken;

        emit WhitelistRoute(originToken, destinationChainId, destinationToken);
    }

    // TODO: the two functions below should be called by the Admin contract.
    function enableL1TokenForLiquidityProvision(address l1Token) public onlyOwner {
        // NOTE: if we run out of bytecode this logic could be refactored into a custom token factory that does the
        // appends and permission setting.
        ExpandedERC20 lpToken = new ExpandedERC20(
            append("Across ", IERC20Metadata(l1Token).name(), " LP Token"), // LP Token Name
            append("Av2-", IERC20Metadata(l1Token).symbol(), "-LP"), // LP Token Symbol
            IERC20Metadata(l1Token).decimals() // LP Token Decimals
        );
        lpToken.addMember(1, address(this)); // Set this contract as the LP Token's minter.
        lpToken.addMember(2, address(this)); // Set this contract as the LP Token's burner.
        lpTokens[l1Token] = LPToken({ lpToken: lpToken, isEnabled: true });
    }

    function disableL1TokenForLiquidityProvision(address l1Token) public onlyOwner {
        lpTokens[l1Token].isEnabled = false;
    }

    // TODO: implement this. this will likely go into a separate Admin contract that contains all the L1->L2 Admin logic.
    // function setTokenToAcceptDeposits(address token) public {}

    /*************************************************
     *          LIQUIDITY PROVIDER FUNCTIONS         *
     *************************************************/

    function addLiquidity(address l1Token, uint256 l1TokenAmount) public payable {
        require(lpTokens[l1Token].isEnabled);
        // If this is the weth pool and the caller sends msg.value then the msg.value must match the l1TokenAmount.
        // Else, msg.value must be set to 0.
        require((address(l1Token) == address(l1Weth) && msg.value == l1TokenAmount) || msg.value == 0, "Bad msg.value");

        // Since `exchangeRateCurrent()` reads this contract's balance and updates contract state using it,
        // we must call it first before transferring any tokens to this contract.
        uint256 lpTokensToMint = (l1TokenAmount * 1e18) / _exchangeRateCurrent();
        ExpandedERC20(lpTokens[l1Token].lpToken).mint(msg.sender, lpTokensToMint);
        // liquidReserves += l1TokenAmount; //TODO: Add this when we have the liquidReserves variable implemented.

        if (address(l1Token) == address(l1Weth) && msg.value > 0)
            WETH9Like(address(l1Token)).deposit{ value: msg.value }();
        else IERC20(l1Token).safeTransferFrom(msg.sender, address(this), l1TokenAmount);

        emit LiquidityAdded(l1Token, l1TokenAmount, lpTokensToMint, msg.sender);
    }

    function removeLiquidity(
        address l1Token,
        uint256 lpTokenAmount,
        bool sendEth
    ) public nonReentrant {
        // Can only send eth on withdrawing liquidity iff this is the WETH pool.
        require(l1Token == address(l1Weth) || !sendEth, "Cant send eth");
        uint256 l1TokensToReturn = (lpTokenAmount * _exchangeRateCurrent()) / 1e18;

        // Check that there is enough liquid reserves to withdraw the requested amount.
        // require(liquidReserves >= (pendingReserves + l1TokensToReturn), "Utilization too high to remove"); // TODO: add this when we have liquid reserves variable implemented.

        ExpandedERC20(lpTokens[l1Token].lpToken).burnFrom(msg.sender, lpTokenAmount);
        // liquidReserves -= l1TokensToReturn; // TODO: add this when we have liquid reserves variable implemented.

        if (sendEth) _unwrapWETHTo(payable(msg.sender), l1TokensToReturn);
        else IERC20(l1Token).safeTransfer(msg.sender, l1TokensToReturn);

        emit LiquidityRemoved(l1Token, l1TokensToReturn, lpTokenAmount, msg.sender);
    }

    function exchangeRateCurrent() public nonReentrant returns (uint256) {
        return _exchangeRateCurrent();
    }

    function liquidityUtilizationPostRelay(address token, uint256 relayedAmount) public returns (uint256) {}

    /*************************************************
     *             DATA WORKER FUNCTIONS             *
     *************************************************/

    function initiateRelayerRefund(
        uint256[] memory bundleEvaluationBlockNumbers,
        bytes32 poolRebalanceProof,
        bytes32 destinationDistributionProof
    ) public {
        relayerRefundRequests.push(
            RelayerRefundRequest({
                poolRebalanceProof: poolRebalanceProof,
                destinationDistributionProof: destinationDistributionProof,
                status: RefundRequestStatus.Pending
            })
        );

        // Pull bonds from from the caller.
        bondToken.safeTransferFrom(msg.sender, address(this), bondAmount);

        emit RelayerRefundRequested(
            uint64(relayerRefundRequests.length - 1), // Index of the relayerRefundRequest within the array.
            bundleEvaluationBlockNumbers,
            poolRebalanceProof,
            destinationDistributionProof,
            msg.sender
        );
    }

    function executeRelayerRefund(
        uint256 relayerRefundRequestId,
        uint256 leafId,
        uint256 repaymentChainId,
        address[] memory l1TokenAddress,
        uint256[] memory accumulatedLpFees,
        uint256[] memory netSendAmounts,
        bytes32[] memory inclusionProof
    ) public {}

    function disputeRelayerRefund() public {}

    function syncUmaEcosystemParams() public nonReentrant {
        FinderInterface finder = FinderInterface(bridgeAdmin.finder());
        // TODO: add this code block when we add dispute logic for the HubPool which needs the OO.
        // optimisticOracle = SkinnyOptimisticOracleInterface(
        //     finder.getImplementationAddress(OracleInterfaces.SkinnyOptimisticOracle)
        // );

        StoreInterface store = StoreInterface(finder.getImplementationAddress(OracleInterfaces.Store));
        bondAmount = store.computeFinalFee(address(bondToken)).rawValue * bondTokenFinalFeeMultiplier;
    }

    /*************************************************
     *              INTERNAL FUNCTIONS               *
     *************************************************/

    function _exchangeRateCurrent() internal pure returns (uint256) {
        return 1e18;
    }

    // Unwraps ETH and does a transfer to a recipient address. If the recipient is a smart contract then sends WETH.
    function _unwrapWETHTo(address payable to, uint256 amount) internal {
        if (address(to).isContract()) {
            IERC20(address(l1Weth)).safeTransfer(to, amount);
        } else {
            l1Weth.withdraw(amount);
            to.transfer(amount);
        }
    }

    function append(
        string memory a,
        string memory b,
        string memory c
    ) internal pure returns (string memory) {
        return string(abi.encodePacked(a, b, c));
    }

    // Added to enable the BridgePool to receive ETH. used when unwrapping Weth.
    receive() external payable {}
}
