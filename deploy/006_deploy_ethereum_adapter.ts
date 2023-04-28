import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: any) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy("Ethereum_Adapter", {
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
    args: [],
  });
};

module.exports = func;
func.dependencies = ["HubPool"];
func.tags = ["EthereumAdapter", "mainnet"];
