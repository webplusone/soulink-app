import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface DiscountDBV0Interface extends utils.Interface {
    functions: {
        "getDiscountRate(address,bytes)": FunctionFragment;
        "nftDiscountRate(address)": FunctionFragment;
        "owner()": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
        "updateNFTDiscountRate(address[],uint16[])": FunctionFragment;
        "updateUserDiscountRate(address[],uint16[])": FunctionFragment;
        "userDiscountRate(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "getDiscountRate" | "nftDiscountRate" | "owner" | "renounceOwnership" | "transferOwnership" | "updateNFTDiscountRate" | "updateUserDiscountRate" | "userDiscountRate"): FunctionFragment;
    encodeFunctionData(functionFragment: "getDiscountRate", values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "nftDiscountRate", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "updateNFTDiscountRate", values: [PromiseOrValue<string>[], PromiseOrValue<BigNumberish>[]]): string;
    encodeFunctionData(functionFragment: "updateUserDiscountRate", values: [PromiseOrValue<string>[], PromiseOrValue<BigNumberish>[]]): string;
    encodeFunctionData(functionFragment: "userDiscountRate", values: [PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "getDiscountRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nftDiscountRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateNFTDiscountRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateUserDiscountRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userDiscountRate", data: BytesLike): Result;
    events: {
        "OwnershipTransferred(address,address)": EventFragment;
        "UpdateNFTDiscountRate(address,uint16)": EventFragment;
        "UpdateUserDiscountRate(address,uint16)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpdateNFTDiscountRate"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpdateUserDiscountRate"): EventFragment;
}
export interface OwnershipTransferredEventObject {
    previousOwner: string;
    newOwner: string;
}
export declare type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], OwnershipTransferredEventObject>;
export declare type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export interface UpdateNFTDiscountRateEventObject {
    nft: string;
    discountRate: number;
}
export declare type UpdateNFTDiscountRateEvent = TypedEvent<[
    string,
    number
], UpdateNFTDiscountRateEventObject>;
export declare type UpdateNFTDiscountRateEventFilter = TypedEventFilter<UpdateNFTDiscountRateEvent>;
export interface UpdateUserDiscountRateEventObject {
    user: string;
    discountRate: number;
}
export declare type UpdateUserDiscountRateEvent = TypedEvent<[
    string,
    number
], UpdateUserDiscountRateEventObject>;
export declare type UpdateUserDiscountRateEventFilter = TypedEventFilter<UpdateUserDiscountRateEvent>;
export interface DiscountDBV0 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: DiscountDBV0Interface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        getDiscountRate(target: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[number] & {
            discountRate: number;
        }>;
        nftDiscountRate(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[number]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateNFTDiscountRate(nfts: PromiseOrValue<string>[], dcRates: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateUserDiscountRate(users: PromiseOrValue<string>[], dcRates: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        userDiscountRate(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[number]>;
    };
    getDiscountRate(target: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<number>;
    nftDiscountRate(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<number>;
    owner(overrides?: CallOverrides): Promise<string>;
    renounceOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateNFTDiscountRate(nfts: PromiseOrValue<string>[], dcRates: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateUserDiscountRate(users: PromiseOrValue<string>[], dcRates: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    userDiscountRate(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<number>;
    callStatic: {
        getDiscountRate(target: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<number>;
        nftDiscountRate(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<number>;
        owner(overrides?: CallOverrides): Promise<string>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        updateNFTDiscountRate(nfts: PromiseOrValue<string>[], dcRates: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<void>;
        updateUserDiscountRate(users: PromiseOrValue<string>[], dcRates: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<void>;
        userDiscountRate(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<number>;
    };
    filters: {
        "OwnershipTransferred(address,address)"(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        "UpdateNFTDiscountRate(address,uint16)"(nft?: null, discountRate?: null): UpdateNFTDiscountRateEventFilter;
        UpdateNFTDiscountRate(nft?: null, discountRate?: null): UpdateNFTDiscountRateEventFilter;
        "UpdateUserDiscountRate(address,uint16)"(user?: null, discountRate?: null): UpdateUserDiscountRateEventFilter;
        UpdateUserDiscountRate(user?: null, discountRate?: null): UpdateUserDiscountRateEventFilter;
    };
    estimateGas: {
        getDiscountRate(target: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        nftDiscountRate(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateNFTDiscountRate(nfts: PromiseOrValue<string>[], dcRates: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateUserDiscountRate(users: PromiseOrValue<string>[], dcRates: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        userDiscountRate(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        getDiscountRate(target: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nftDiscountRate(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateNFTDiscountRate(nfts: PromiseOrValue<string>[], dcRates: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateUserDiscountRate(users: PromiseOrValue<string>[], dcRates: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        userDiscountRate(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=DiscountDBV0.d.ts.map