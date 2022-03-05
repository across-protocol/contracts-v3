/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IFxStateSender, IFxStateSenderInterface } from "../IFxStateSender";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "sendMessageToChild",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IFxStateSender__factory {
  static readonly abi = _abi;
  static createInterface(): IFxStateSenderInterface {
    return new utils.Interface(_abi) as IFxStateSenderInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IFxStateSender {
    return new Contract(address, _abi, signerOrProvider) as IFxStateSender;
  }
}
