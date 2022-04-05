import * as deploymentExport from "../deployments/export.json";

export function getContractArtifact(contractName: string, networkId: number) {
  try {
    return deploymentExport[networkId.toString()][0].contracts[contractName];
  } catch (error) {
    throw new Error(`Contract ${contractName} not found on ${networkId} in export.json`);
  }
}