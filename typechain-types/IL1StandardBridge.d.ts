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
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface IL1StandardBridgeInterface extends ethers.utils.Interface {
  functions: {
    "depositERC20(address,address,uint256,uint32,bytes)": FunctionFragment;
    "depositERC20To(address,address,address,uint256,uint32,bytes)": FunctionFragment;
    "depositETH(uint32,bytes)": FunctionFragment;
    "depositETHTo(address,uint32,bytes)": FunctionFragment;
    "finalizeERC20Withdrawal(address,address,address,address,uint256,bytes)": FunctionFragment;
    "finalizeETHWithdrawal(address,address,uint256,bytes)": FunctionFragment;
    "l2TokenBridge()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "depositERC20",
    values: [string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "depositERC20To",
    values: [string, string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "depositETH", values: [BigNumberish, BytesLike]): string;
  encodeFunctionData(functionFragment: "depositETHTo", values: [string, BigNumberish, BytesLike]): string;
  encodeFunctionData(
    functionFragment: "finalizeERC20Withdrawal",
    values: [string, string, string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "finalizeETHWithdrawal",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "l2TokenBridge", values?: undefined): string;

  decodeFunctionResult(functionFragment: "depositERC20", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "depositERC20To", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "depositETH", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "depositETHTo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "finalizeERC20Withdrawal", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "finalizeETHWithdrawal", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "l2TokenBridge", data: BytesLike): Result;

  events: {
    "ERC20DepositInitiated(address,address,address,address,uint256,bytes)": EventFragment;
    "ERC20WithdrawalFinalized(address,address,address,address,uint256,bytes)": EventFragment;
    "ETHDepositInitiated(address,address,uint256,bytes)": EventFragment;
    "ETHWithdrawalFinalized(address,address,uint256,bytes)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ERC20DepositInitiated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ERC20WithdrawalFinalized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ETHDepositInitiated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ETHWithdrawalFinalized"): EventFragment;
}

export type ERC20DepositInitiatedEvent = TypedEvent<
  [string, string, string, string, BigNumber, string] & {
    _l1Token: string;
    _l2Token: string;
    _from: string;
    _to: string;
    _amount: BigNumber;
    _data: string;
  }
>;

export type ERC20WithdrawalFinalizedEvent = TypedEvent<
  [string, string, string, string, BigNumber, string] & {
    _l1Token: string;
    _l2Token: string;
    _from: string;
    _to: string;
    _amount: BigNumber;
    _data: string;
  }
>;

export type ETHDepositInitiatedEvent = TypedEvent<
  [string, string, BigNumber, string] & {
    _from: string;
    _to: string;
    _amount: BigNumber;
    _data: string;
  }
>;

export type ETHWithdrawalFinalizedEvent = TypedEvent<
  [string, string, BigNumber, string] & {
    _from: string;
    _to: string;
    _amount: BigNumber;
    _data: string;
  }
>;

export class IL1StandardBridge extends BaseContract {
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

  interface: IL1StandardBridgeInterface;

  functions: {
    depositERC20(
      _l1Token: string,
      _l2Token: string,
      _amount: BigNumberish,
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depositERC20To(
      _l1Token: string,
      _l2Token: string,
      _to: string,
      _amount: BigNumberish,
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depositETH(
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depositETHTo(
      _to: string,
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    finalizeERC20Withdrawal(
      _l1Token: string,
      _l2Token: string,
      _from: string,
      _to: string,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    finalizeETHWithdrawal(
      _from: string,
      _to: string,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    l2TokenBridge(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;
  };

  depositERC20(
    _l1Token: string,
    _l2Token: string,
    _amount: BigNumberish,
    _l2Gas: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depositERC20To(
    _l1Token: string,
    _l2Token: string,
    _to: string,
    _amount: BigNumberish,
    _l2Gas: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depositETH(
    _l2Gas: BigNumberish,
    _data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depositETHTo(
    _to: string,
    _l2Gas: BigNumberish,
    _data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  finalizeERC20Withdrawal(
    _l1Token: string,
    _l2Token: string,
    _from: string,
    _to: string,
    _amount: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  finalizeETHWithdrawal(
    _from: string,
    _to: string,
    _amount: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  l2TokenBridge(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  callStatic: {
    depositERC20(
      _l1Token: string,
      _l2Token: string,
      _amount: BigNumberish,
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    depositERC20To(
      _l1Token: string,
      _l2Token: string,
      _to: string,
      _amount: BigNumberish,
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    depositETH(_l2Gas: BigNumberish, _data: BytesLike, overrides?: CallOverrides): Promise<void>;

    depositETHTo(_to: string, _l2Gas: BigNumberish, _data: BytesLike, overrides?: CallOverrides): Promise<void>;

    finalizeERC20Withdrawal(
      _l1Token: string,
      _l2Token: string,
      _from: string,
      _to: string,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    finalizeETHWithdrawal(
      _from: string,
      _to: string,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    l2TokenBridge(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "ERC20DepositInitiated(address,address,address,address,uint256,bytes)"(
      _l1Token?: string | null,
      _l2Token?: string | null,
      _from?: string | null,
      _to?: null,
      _amount?: null,
      _data?: null
    ): TypedEventFilter<
      [string, string, string, string, BigNumber, string],
      {
        _l1Token: string;
        _l2Token: string;
        _from: string;
        _to: string;
        _amount: BigNumber;
        _data: string;
      }
    >;

    ERC20DepositInitiated(
      _l1Token?: string | null,
      _l2Token?: string | null,
      _from?: string | null,
      _to?: null,
      _amount?: null,
      _data?: null
    ): TypedEventFilter<
      [string, string, string, string, BigNumber, string],
      {
        _l1Token: string;
        _l2Token: string;
        _from: string;
        _to: string;
        _amount: BigNumber;
        _data: string;
      }
    >;

    "ERC20WithdrawalFinalized(address,address,address,address,uint256,bytes)"(
      _l1Token?: string | null,
      _l2Token?: string | null,
      _from?: string | null,
      _to?: null,
      _amount?: null,
      _data?: null
    ): TypedEventFilter<
      [string, string, string, string, BigNumber, string],
      {
        _l1Token: string;
        _l2Token: string;
        _from: string;
        _to: string;
        _amount: BigNumber;
        _data: string;
      }
    >;

    ERC20WithdrawalFinalized(
      _l1Token?: string | null,
      _l2Token?: string | null,
      _from?: string | null,
      _to?: null,
      _amount?: null,
      _data?: null
    ): TypedEventFilter<
      [string, string, string, string, BigNumber, string],
      {
        _l1Token: string;
        _l2Token: string;
        _from: string;
        _to: string;
        _amount: BigNumber;
        _data: string;
      }
    >;

    "ETHDepositInitiated(address,address,uint256,bytes)"(
      _from?: string | null,
      _to?: string | null,
      _amount?: null,
      _data?: null
    ): TypedEventFilter<
      [string, string, BigNumber, string],
      { _from: string; _to: string; _amount: BigNumber; _data: string }
    >;

    ETHDepositInitiated(
      _from?: string | null,
      _to?: string | null,
      _amount?: null,
      _data?: null
    ): TypedEventFilter<
      [string, string, BigNumber, string],
      { _from: string; _to: string; _amount: BigNumber; _data: string }
    >;

    "ETHWithdrawalFinalized(address,address,uint256,bytes)"(
      _from?: string | null,
      _to?: string | null,
      _amount?: null,
      _data?: null
    ): TypedEventFilter<
      [string, string, BigNumber, string],
      { _from: string; _to: string; _amount: BigNumber; _data: string }
    >;

    ETHWithdrawalFinalized(
      _from?: string | null,
      _to?: string | null,
      _amount?: null,
      _data?: null
    ): TypedEventFilter<
      [string, string, BigNumber, string],
      { _from: string; _to: string; _amount: BigNumber; _data: string }
    >;
  };

  estimateGas: {
    depositERC20(
      _l1Token: string,
      _l2Token: string,
      _amount: BigNumberish,
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depositERC20To(
      _l1Token: string,
      _l2Token: string,
      _to: string,
      _amount: BigNumberish,
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depositETH(
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depositETHTo(
      _to: string,
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    finalizeERC20Withdrawal(
      _l1Token: string,
      _l2Token: string,
      _from: string,
      _to: string,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    finalizeETHWithdrawal(
      _from: string,
      _to: string,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    l2TokenBridge(overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;
  };

  populateTransaction: {
    depositERC20(
      _l1Token: string,
      _l2Token: string,
      _amount: BigNumberish,
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depositERC20To(
      _l1Token: string,
      _l2Token: string,
      _to: string,
      _amount: BigNumberish,
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depositETH(
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depositETHTo(
      _to: string,
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    finalizeERC20Withdrawal(
      _l1Token: string,
      _l2Token: string,
      _from: string,
      _to: string,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    finalizeETHWithdrawal(
      _from: string,
      _to: string,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    l2TokenBridge(overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;
  };
}
