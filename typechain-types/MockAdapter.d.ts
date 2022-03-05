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
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface MockAdapterInterface extends ethers.utils.Interface {
  functions: {
    "bridge()": FunctionFragment;
    "relayMessage(address,bytes)": FunctionFragment;
    "relayTokens(address,address,uint256,address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "bridge", values?: undefined): string;
  encodeFunctionData(functionFragment: "relayMessage", values: [string, BytesLike]): string;
  encodeFunctionData(functionFragment: "relayTokens", values: [string, string, BigNumberish, string]): string;

  decodeFunctionResult(functionFragment: "bridge", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "relayMessage", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "relayTokens", data: BytesLike): Result;

  events: {
    "HubPoolChanged(address)": EventFragment;
    "MessageRelayed(address,bytes)": EventFragment;
    "RelayMessageCalled(address,bytes,address)": EventFragment;
    "RelayTokensCalled(address,address,uint256,address,address)": EventFragment;
    "TokensRelayed(address,address,uint256,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "HubPoolChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MessageRelayed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RelayMessageCalled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RelayTokensCalled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokensRelayed"): EventFragment;
}

export type HubPoolChangedEvent = TypedEvent<[string] & { newHubPool: string }>;

export type MessageRelayedEvent = TypedEvent<[string, string] & { target: string; message: string }>;

export type RelayMessageCalledEvent = TypedEvent<
  [string, string, string] & { target: string; message: string; caller: string }
>;

export type RelayTokensCalledEvent = TypedEvent<
  [string, string, BigNumber, string, string] & {
    l1Token: string;
    l2Token: string;
    amount: BigNumber;
    to: string;
    caller: string;
  }
>;

export type TokensRelayedEvent = TypedEvent<
  [string, string, BigNumber, string] & {
    l1Token: string;
    l2Token: string;
    amount: BigNumber;
    to: string;
  }
>;

export class MockAdapter extends BaseContract {
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

  interface: MockAdapterInterface;

  functions: {
    bridge(overrides?: CallOverrides): Promise<[string]>;

    relayMessage(
      target: string,
      message: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    relayTokens(
      l1Token: string,
      l2Token: string,
      amount: BigNumberish,
      to: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  bridge(overrides?: CallOverrides): Promise<string>;

  relayMessage(
    target: string,
    message: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  relayTokens(
    l1Token: string,
    l2Token: string,
    amount: BigNumberish,
    to: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    bridge(overrides?: CallOverrides): Promise<string>;

    relayMessage(target: string, message: BytesLike, overrides?: CallOverrides): Promise<void>;

    relayTokens(
      l1Token: string,
      l2Token: string,
      amount: BigNumberish,
      to: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "HubPoolChanged(address)"(newHubPool?: null): TypedEventFilter<[string], { newHubPool: string }>;

    HubPoolChanged(newHubPool?: null): TypedEventFilter<[string], { newHubPool: string }>;

    "MessageRelayed(address,bytes)"(
      target?: null,
      message?: null
    ): TypedEventFilter<[string, string], { target: string; message: string }>;

    MessageRelayed(
      target?: null,
      message?: null
    ): TypedEventFilter<[string, string], { target: string; message: string }>;

    "RelayMessageCalled(address,bytes,address)"(
      target?: null,
      message?: null,
      caller?: null
    ): TypedEventFilter<[string, string, string], { target: string; message: string; caller: string }>;

    RelayMessageCalled(
      target?: null,
      message?: null,
      caller?: null
    ): TypedEventFilter<[string, string, string], { target: string; message: string; caller: string }>;

    "RelayTokensCalled(address,address,uint256,address,address)"(
      l1Token?: null,
      l2Token?: null,
      amount?: null,
      to?: null,
      caller?: null
    ): TypedEventFilter<
      [string, string, BigNumber, string, string],
      {
        l1Token: string;
        l2Token: string;
        amount: BigNumber;
        to: string;
        caller: string;
      }
    >;

    RelayTokensCalled(
      l1Token?: null,
      l2Token?: null,
      amount?: null,
      to?: null,
      caller?: null
    ): TypedEventFilter<
      [string, string, BigNumber, string, string],
      {
        l1Token: string;
        l2Token: string;
        amount: BigNumber;
        to: string;
        caller: string;
      }
    >;

    "TokensRelayed(address,address,uint256,address)"(
      l1Token?: null,
      l2Token?: null,
      amount?: null,
      to?: null
    ): TypedEventFilter<
      [string, string, BigNumber, string],
      { l1Token: string; l2Token: string; amount: BigNumber; to: string }
    >;

    TokensRelayed(
      l1Token?: null,
      l2Token?: null,
      amount?: null,
      to?: null
    ): TypedEventFilter<
      [string, string, BigNumber, string],
      { l1Token: string; l2Token: string; amount: BigNumber; to: string }
    >;
  };

  estimateGas: {
    bridge(overrides?: CallOverrides): Promise<BigNumber>;

    relayMessage(
      target: string,
      message: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    relayTokens(
      l1Token: string,
      l2Token: string,
      amount: BigNumberish,
      to: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    bridge(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    relayMessage(
      target: string,
      message: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    relayTokens(
      l1Token: string,
      l2Token: string,
      amount: BigNumberish,
      to: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
