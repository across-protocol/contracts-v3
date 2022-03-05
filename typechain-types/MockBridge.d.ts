/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface MockBridgeInterface extends ethers.utils.Interface {
  functions: {
    "bridgeMessage(address,bytes)": FunctionFragment;
    "bridgeTokens(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "bridgeMessage", values: [string, BytesLike]): string;
  encodeFunctionData(functionFragment: "bridgeTokens", values: [string, BigNumberish]): string;

  decodeFunctionResult(functionFragment: "bridgeMessage", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "bridgeTokens", data: BytesLike): Result;

  events: {
    "BridgedMessage(address,bytes)": EventFragment;
    "BridgedTokens(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BridgedMessage"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BridgedTokens"): EventFragment;
}

export type BridgedMessageEvent = TypedEvent<[string, string] & { target: string; message: string }>;

export type BridgedTokensEvent = TypedEvent<[string, BigNumber] & { token: string; amount: BigNumber }>;

export class MockBridge extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: MockBridgeInterface;

  functions: {
    bridgeMessage(
      target: string,
      message: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    bridgeTokens(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  bridgeMessage(
    target: string,
    message: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  bridgeTokens(
    token: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    bridgeMessage(target: string, message: BytesLike, overrides?: CallOverrides): Promise<void>;

    bridgeTokens(token: string, amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "BridgedMessage(address,bytes)"(
      target?: null,
      message?: null
    ): TypedEventFilter<[string, string], { target: string; message: string }>;

    BridgedMessage(
      target?: null,
      message?: null
    ): TypedEventFilter<[string, string], { target: string; message: string }>;

    "BridgedTokens(address,uint256)"(
      token?: null,
      amount?: null
    ): TypedEventFilter<[string, BigNumber], { token: string; amount: BigNumber }>;

    BridgedTokens(
      token?: null,
      amount?: null
    ): TypedEventFilter<[string, BigNumber], { token: string; amount: BigNumber }>;
  };

  estimateGas: {
    bridgeMessage(
      target: string,
      message: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    bridgeTokens(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    bridgeMessage(
      target: string,
      message: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    bridgeTokens(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
