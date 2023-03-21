import { getContractFactory, ethers, hre } from "../test/utils";
import { readFileSync } from "fs";
import path from "path";
import { CID } from "multiformats/cid";
import PinataSDK from "@pinata/sdk";

/**
 * Script to upload metadata JSON file to IPFS via Pinata and set token uri. Make sure to set the env var
 * `PINATA_JWT` in your .env file. Then you can run this script with:
 * ```
 * TOKEN_ID=<TOKEN_ID> \
 * METADATA=<PATH> \
 * yarn hardhat run ./scripts/setERC1155Metadata.ts --network polygon-mumbai
 * ```
 */
async function main() {
  const tokenId = parseInt(process.env.TOKEN_ID || "0");
  const metadata = parseAndValidateMetadata();
  console.log(`Setting ERC1155 metadata for:`, { tokenId, metadata });

  const pinata = new PinataSDK({ pinataJWTKey: process.env.PINATA_JWT });
  const pinResult = await pinata.pinJSONToIPFS(metadata);
  const metadataIpfsLink = `ipfs://${pinResult.IpfsHash}`;
  console.log(`Successfully uploaded metadata to IPFS:`, metadataIpfsLink);

  const [signer] = await ethers.getSigners();
  const erc1155Deployment = await hre.deployments.get("MintableERC1155");
  const erc1155 = (await getContractFactory("MintableERC1155", { signer })).attach(erc1155Deployment.address);
  const setTokenUriTx = await erc1155.setTokenURI(tokenId, metadataIpfsLink);
  console.log(`Setting token uri...`);
  console.log("Tx hash:", setTokenUriTx.hash);
  await setTokenUriTx.wait();
  console.log(`Successfully set token uri`);
}

function parseAndValidateMetadata() {
  if (!process.env.METADATA) {
    throw new Error("Missing path to a JSON file with token metadata. Pass it via env var METADATA=<PATH>");
  }
  const metadataFilePath = path.join(__dirname, "..", process.env.METADATA);
  const metadataFromFile: Record<string, string> = JSON.parse(readFileSync(metadataFilePath, "utf8"));
  const requiredKeys = ["name", "description", "image"];

  if (!requiredKeys.every((k) => k in metadataFromFile)) {
    throw new Error(`Invalid metadata: required keys ${requiredKeys}`);
  }

  // Make sure the image is an IPFS link
  if (!metadataFromFile.image.startsWith("ipfs://")) {
    throw new Error(`Invalid metadata: 'image' must be an IPFS link ipfs://<CID>`);
  }
  const cid = metadataFromFile.image.split("ipfs://")[1];

  CID.parse(cid); // throws if invalid

  return metadataFromFile;
}

main().then(
  () => console.log("Done"),
  (error) => {
    console.log(error);
    process.exitCode = 1;
  }
);
