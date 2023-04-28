import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: any) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy("AcrossConfigStore", {
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
  });
};

module.exports = func;
func.tags = ["AcrossConfigStore", "mainnet"];
