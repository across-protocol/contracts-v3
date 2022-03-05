/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MerkleLibTest, MerkleLibTestInterface } from "../MerkleLibTest";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "claimedBitMap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claimedBitMap1D",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "isClaimed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "isClaimed1D",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "setClaimed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "setClaimed1D",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "root",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "chainId",
            type: "uint256",
          },
          {
            internalType: "uint256[]",
            name: "bundleLpFees",
            type: "uint256[]",
          },
          {
            internalType: "int256[]",
            name: "netSendAmounts",
            type: "int256[]",
          },
          {
            internalType: "int256[]",
            name: "runningBalances",
            type: "int256[]",
          },
          {
            internalType: "uint8",
            name: "leafId",
            type: "uint8",
          },
          {
            internalType: "address[]",
            name: "l1Tokens",
            type: "address[]",
          },
        ],
        internalType: "struct HubPoolInterface.PoolRebalanceLeaf",
        name: "rebalance",
        type: "tuple",
      },
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]",
      },
    ],
    name: "verifyPoolRebalance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "root",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "amountToReturn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "chainId",
            type: "uint256",
          },
          {
            internalType: "uint256[]",
            name: "refundAmounts",
            type: "uint256[]",
          },
          {
            internalType: "uint32",
            name: "leafId",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "l2TokenAddress",
            type: "address",
          },
          {
            internalType: "address[]",
            name: "refundAddresses",
            type: "address[]",
          },
        ],
        internalType: "struct SpokePoolInterface.RelayerRefundLeaf",
        name: "refund",
        type: "tuple",
      },
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]",
      },
    ],
    name: "verifyRelayerRefund",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "root",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "address",
            name: "depositor",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "address",
            name: "destinationToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "originChainId",
            type: "uint256",
          },
          {
            internalType: "uint64",
            name: "realizedLpFeePct",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "relayerFeePct",
            type: "uint64",
          },
          {
            internalType: "uint32",
            name: "depositId",
            type: "uint32",
          },
        ],
        internalType: "struct SpokePoolInterface.RelayData",
        name: "slowRelayFulfillment",
        type: "tuple",
      },
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]",
      },
    ],
    name: "verifySlowRelayFulfillment",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610c53806100206000396000f3fe608060405234801561001057600080fd5b50600436106100a35760003560e01c8063a1a3c4fa11610076578063e7aa0bd71161005b578063e7aa0bd714610135578063ed5e734114610148578063ee25560b1461015b57600080fd5b8063a1a3c4fa1461010d578063c451d7e01461012257600080fd5b80630228e57d146100a857806350897f62146100d05780637a1ab287146100e75780639e34070f146100fa575b600080fd5b6100bb6100b63660046105db565b61017b565b60405190151581526020015b60405180910390f35b6100d960015481565b6040519081526020016100c7565b6100bb6100f53660046106d0565b610190565b6100bb6101083660046106d0565b6101a4565b61012061011b3660046106d0565b6101b1565b005b6100bb6101303660046106fa565b6101c3565b6101206101433660046106d0565b6101d0565b6100bb6101563660046107de565b6101de565b6100d96101693660046106d0565b60006020819052908152604090205481565b60006101888484846101eb565b949350505050565b60018054600091831b908116145b92915050565b600061019e60008361021e565b6101bd6001548261025f565b60015550565b60006101888484846102ea565b6101db600082610302565b50565b6000610188848484610340565b60006101888285856040516020016102039190610956565b60405160208183030381529060405280519060200120610358565b60008061022d61010084610a29565b9050600061023d61010085610a3d565b6000928352602095909552506040902054600190931b92831690921492915050565b600060ff8211156102d0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f496e646578206f7574206f6620626f756e647300000000000000000000000000604482015260640160405180910390fd5b6102dc61010083610a3d565b6001901b8317905092915050565b60006101888285856040516020016102039190610a51565b600061031061010083610a29565b9050600061032061010084610a3d565b600092835260209490945250604090208054600190931b90921790915550565b60006101888285856040516020016102039190610afb565b600082610365858461036e565b14949350505050565b600081815b84518110156103da57600085828151811061039057610390610b8e565b602002602001015190508083116103b657600083815260208290526040902092506103c7565b600081815260208490526040902092505b50806103d281610bbd565b915050610373565b509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60405160c0810167ffffffffffffffff81118282101715610434576104346103e2565b60405290565b604051610100810167ffffffffffffffff81118282101715610434576104346103e2565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156104a5576104a56103e2565b604052919050565b600067ffffffffffffffff8211156104c7576104c76103e2565b5060051b60200190565b600082601f8301126104e257600080fd5b813560206104f76104f2836104ad565b61045e565b82815260059290921b8401810191818101908684111561051657600080fd5b8286015b84811015610531578035835291830191830161051a565b509695505050505050565b803563ffffffff8116811461055057600080fd5b919050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461055057600080fd5b600082601f83011261058a57600080fd5b8135602061059a6104f2836104ad565b82815260059290921b840181019181810190868411156105b957600080fd5b8286015b84811015610531576105ce81610555565b83529183019183016105bd565b6000806000606084860312156105f057600080fd5b83359250602084013567ffffffffffffffff8082111561060f57600080fd5b9085019060c0828803121561062357600080fd5b61062b610411565b823581526020830135602082015260408301358281111561064b57600080fd5b610657898286016104d1565b6040830152506106696060840161053c565b606082015261067a60808401610555565b608082015260a08301358281111561069157600080fd5b61069d89828601610579565b60a083015250935060408601359150808211156106b957600080fd5b506106c6868287016104d1565b9150509250925092565b6000602082840312156106e257600080fd5b5035919050565b803560ff8116811461055057600080fd5b60008060006060848603121561070f57600080fd5b83359250602084013567ffffffffffffffff8082111561072e57600080fd5b9085019060c0828803121561074257600080fd5b61074a610411565b8235815260208301358281111561076057600080fd5b61076c898286016104d1565b60208301525060408301358281111561078457600080fd5b610790898286016104d1565b6040830152506060830135828111156107a857600080fd5b6107b4898286016104d1565b60608301525061067a608084016106e9565b803567ffffffffffffffff8116811461055057600080fd5b60008060008385036101408112156107f557600080fd5b84359350610100807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08301121561082b57600080fd5b61083361043a565b915061084160208701610555565b825261084f60408701610555565b602083015261086060608701610555565b60408301526080860135606083015260a0860135608083015261088560c087016107c6565b60a083015261089660e087016107c6565b60c08301526108a681870161053c565b60e083015250915061012084013567ffffffffffffffff8111156108c957600080fd5b6106c6868287016104d1565b600081518084526020808501945080840160005b83811015610905578151875295820195908201906001016108e9565b509495945050505050565b600081518084526020808501945080840160005b8381101561090557815173ffffffffffffffffffffffffffffffffffffffff1687529582019590820190600101610924565b6020815281516020820152602082015160408201526000604083015160c0606084015261098660e08401826108d5565b905063ffffffff606085015116608084015273ffffffffffffffffffffffffffffffffffffffff60808501511660a084015260a08401517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08483030160c08501526109f18282610910565b95945050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600082610a3857610a386109fa565b500490565b600082610a4c57610a4c6109fa565b500690565b60208152815160208201526000602083015160c06040840152610a7760e08401826108d5565b905060408401517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe080858403016060860152610ab383836108d5565b92506060860151915080858403016080860152610ad083836108d5565b925060ff60808701511660a086015260a08601519150808584030160c0860152506109f18282610910565b60006101008201905073ffffffffffffffffffffffffffffffffffffffff80845116835280602085015116602084015280604085015116604084015250606083015160608301526080830151608083015260a083015167ffffffffffffffff80821660a08501528060c08601511660c0850152505060e0830151610b8760e084018263ffffffff169052565b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610c16577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b506001019056fea26469706673582212203521c30c3685f21eb8690464c545ce34559ce6ee33dd4ba14a3afade62944f5664736f6c634300080b0033";

export class MerkleLibTest__factory extends ContractFactory {
  constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(overrides?: Overrides & { from?: string | Promise<string> }): Promise<MerkleLibTest> {
    return super.deploy(overrides || {}) as Promise<MerkleLibTest>;
  }
  getDeployTransaction(overrides?: Overrides & { from?: string | Promise<string> }): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MerkleLibTest {
    return super.attach(address) as MerkleLibTest;
  }
  connect(signer: Signer): MerkleLibTest__factory {
    return super.connect(signer) as MerkleLibTest__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MerkleLibTestInterface {
    return new utils.Interface(_abi) as MerkleLibTestInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): MerkleLibTest {
    return new Contract(address, _abi, signerOrProvider) as MerkleLibTest;
  }
}
