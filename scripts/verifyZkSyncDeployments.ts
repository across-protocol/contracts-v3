// zksync block explorer does not support reading and writing to implementation contracts via a proxy
// contract yet, so verification of the contract configuration/state must be done programatically.
// To verify the zkSync SpokePool:
//   yarn hardhat run --network zksync ./scripts/verifyZkSyncDeployments.ts
//
// To verify the zkSync adapter on mainnet:
//   yarn hardhat run --network mainnet ./scripts/verifyZkSyncDeployments.ts

import { assert } from "console";
import { promises as fs } from "fs";
import { ContractFactory } from "ethers";
import { Provider as zkProvider, utils as zkUtils } from "zksync-web3";
import { ethers, toBN, findArtifactFromPath, SignerWithAddress } from "../utils/utils";

const textPadding = 30;

/**
 * l2RefundAddress and spokePoolDeploymentBlocks can change per deployment.
 */
const l2RefundAddress = "0x428AB2BA90Eba0a4Be7aF34C9Ac451ab061AC010";

const tokens: { [chainId: number]: { symbol: string; address: string }[] } = {
  1: [{ symbol: "WETH", address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" }],
  324: [{ symbol: "WETH", address: "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91" }],
};

async function verifyAdapter(
  chainId: number,
  signer: SignerWithAddress,
  deployments: Record<string, any>
): Promise<void> {
  const contractName = "ZkSync_Adapter";
  assert([1, 5].includes(chainId), `Unexpected chain ID (${chainId})`);

  const adapterAddress = deployments[chainId.toString()][contractName].address;
  console.log(`${contractName} address:`.padEnd(textPadding) + adapterAddress);

  const rpcUrl = chainId === 1 ? "https://mainnet.era.zksync.io" : "https://testnet.era.zksync.dev";

  const provider = new zkProvider(rpcUrl);

  const adapterArtifact = findArtifactFromPath(contractName, "./artifacts/contracts");
  const adapterFactory = new ContractFactory(adapterArtifact.abi, adapterArtifact.bytecode, signer);

  const adapter = await adapterFactory.attach(adapterAddress);

  const weth = tokens[chainId].find(({ symbol }) => symbol === "WETH")?.address;
  const l1Weth = await adapter.l1Weth();
  console.log("L1 WETH:".padEnd(textPadding) + l1Weth);
  assert(l1Weth.toLowerCase() === weth?.toLowerCase(), `Unexpected L1 WETH: ${l1Weth} != ${weth}`);

  const _l2RefundAddress = await adapter.l2RefundAddress();
  console.log("L2 refund address:".padEnd(textPadding) + l2RefundAddress);
  assert(
    _l2RefundAddress.toLowerCase() === l2RefundAddress.toLowerCase(),
    `Unexpected L2 refund address: ${_l2RefundAddress} != ${l2RefundAddress}`
  );

  const l1MessageBridge = await provider.getMainContractAddress();
  const zkSyncMessageBridge = await adapter.zkSyncMessageBridge();
  console.log("zkSyncMessageBridge:".padEnd(textPadding) + zkSyncMessageBridge);
  assert(
    zkSyncMessageBridge.toLowerCase() === l1MessageBridge.toLowerCase(),
    `Unexpected L1 message bridge: ${zkSyncMessageBridge} != ${l1MessageBridge}`
  );

  const l1ERC20BridgeProxy = await adapter.zkErc20Bridge();
  console.log("zkERC20Bridge:".padEnd(textPadding) + l1ERC20BridgeProxy);
  const { erc20L1: expectL1Bridge } = await provider.getDefaultBridgeAddresses();
  assert(
    l1ERC20BridgeProxy.toLowerCase() === expectL1Bridge.toLowerCase(),
    `Unexpected L1ERC20Bridge: ${l1ERC20BridgeProxy} != ${expectL1Bridge}`
  );
}

async function verifySpokePool(
  chainId: number,
  signer: SignerWithAddress,
  deployments: Record<string, any>
): Promise<void> {
  const contractName = "ZkSync_SpokePool";
  assert([280, 324].includes(chainId), `Unexpected chain ID (${chainId})`);

  const hubChainId = chainId === 324 ? 1 : 5;

  const rpcUrl = chainId === 324 ? "https://mainnet.era.zksync.io" : "https://testnet.era.zksync.dev";
  const provider = new zkProvider(rpcUrl);

  const spokePoolAddress = deployments[chainId.toString()].SpokePool.address;

  // Initialize contracts:
  const spokePoolArtifact = findArtifactFromPath(contractName, `./artifacts-zk/contracts`);
  const spokePoolFactory = new ContractFactory(spokePoolArtifact.abi, spokePoolArtifact.bytecode, signer);
  const spokePool = await spokePoolFactory.attach(spokePoolAddress);

  // Log state from SpokePool
  const originChainId = await spokePool.chainId();
  console.log("SpokePool chainId():".padEnd(textPadding) + originChainId);
  assert(Number(originChainId) === Number(chainId), `${originChainId} != ${chainId}`);

  const currentTime = await spokePool.getCurrentTime();
  console.log("SpokePool getCurrentTime():".padEnd(textPadding) + currentTime.toString());

  const wethAddress = await spokePool.wrappedNativeToken();
  const expectedWethAddress = tokens[chainId].find(({ symbol }) => symbol === "WETH")?.address;
  assert(wethAddress === expectedWethAddress, `wrappedNativeToken: ${wethAddress} !== ${expectedWethAddress}`);

  const hubPool = await spokePool.hubPool();
  const expectedHubPool = deployments[hubChainId.toString()].HubPool.address;
  console.log("SpokePool hubPool():".padEnd(textPadding) + hubPool);
  assert(hubPool === expectedHubPool, `HubPool: ${hubPool} != ${expectedHubPool}`);

  const admin = await spokePool.crossDomainAdmin();
  console.log("SpokePool crossDomainAdmin():".padEnd(textPadding) + admin);
  assert(admin === hubPool, `${admin} != ${hubPool}`);

  const aliasAddress = ethers.utils.getAddress(toBN(admin).add(zkUtils.L1_TO_L2_ALIAS_OFFSET).toHexString());
  console.log("Aliased admin address:".padEnd(textPadding) + aliasAddress);

  const { erc20L2: expectL2Bridge } = await provider.getDefaultBridgeAddresses();
  const zkERC20Bridge = await spokePool.zkErc20Bridge();
  console.log("SpokePool zkERC20Bridge():".padEnd(textPadding) + zkERC20Bridge);
  assert(zkERC20Bridge.toLowerCase() === expectL2Bridge.toLowerCase(), `${zkERC20Bridge} != ${expectL2Bridge}`);

  // Log EnabledDepositRoute on SpokePool to test that L1 message arrived to L2:
  const deploymentBlock = deployments[chainId.toString()].SpokePool.blockNumber;
  const filter = spokePool.filters.EnabledDepositRoute();
  const events = await spokePool.queryFilter(filter, deploymentBlock);
  events.forEach((e) => {
    console.log(`Found EnabledDepositRouteEvent in ${e.transactionHash}: `, e.args);
  });
  assert(events.length === 0, `${events.length} EnabledDepositRoutes events found!`);
}

async function main() {
  const [signer] = await ethers.getSigners();
  const chainId = (await signer?.provider?.getNetwork())?.chainId;

  // deployments.json is generated by scripts/processHardhatExport.ts
  const _deployments = await fs.readFile("./deployments/deployments.json", "utf8");
  const deployments = JSON.parse(_deployments);

  switch (chainId) {
    case 1:
      await verifyAdapter(chainId, signer, deployments);
      break;
    case 324:
      await verifySpokePool(chainId, signer, deployments);
      break;
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`);
  }
}

main().then(
  () => process.exit(0),
  (error) => {
    console.log(error);
    process.exit(1);
  }
);
