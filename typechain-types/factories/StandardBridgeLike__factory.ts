/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { StandardBridgeLike, StandardBridgeLikeInterface } from "../StandardBridgeLike";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_l1Token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "outboundTransfer",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

export class StandardBridgeLike__factory {
  static readonly abi = _abi;
  static createInterface(): StandardBridgeLikeInterface {
    return new utils.Interface(_abi) as StandardBridgeLikeInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): StandardBridgeLike {
    return new Contract(address, _abi, signerOrProvider) as StandardBridgeLike;
  }
}
