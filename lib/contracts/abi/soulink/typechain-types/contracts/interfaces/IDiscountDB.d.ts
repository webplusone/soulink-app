import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface IDiscountDBInterface extends utils.Interface {
    functions: {
        "getDiscountRate(address,bytes)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "getDiscountRate"): FunctionFragment;
    encodeFunctionData(functionFragment: "getDiscountRate", values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "getDiscountRate", data: BytesLike): Result;
    events: {
        "UpdateERC1155DiscountRate(address,uint256,uint16)": EventFragment;
        "UpdateNFTDiscountRate(address,uint16)": EventFragment;
        "UpdateUserDiscountRate(address,uint16)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "UpdateERC1155DiscountRate"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpdateNFTDiscountRate"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpdateUserDiscountRate"): EventFragment;
}
export interface UpdateERC1155DiscountRateEventObject {
    token: string;
    tokenId: BigNumber;
    discountRate: number;
}
export declare type UpdateERC1155DiscountRateEvent = TypedEvent<[
    string,
    BigNumber,
    number
], UpdateERC1155DiscountRateEventObject>;
export declare type UpdateERC1155DiscountRateEventFilter = TypedEventFilter<UpdateERC1155DiscountRateEvent>;
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
export interface IDiscountDB extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IDiscountDBInterface;
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
        getDiscountRate(target: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[number]>;
    };
    getDiscountRate(target: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<number>;
    callStatic: {
        getDiscountRate(target: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<number>;
    };
    filters: {
        "UpdateERC1155DiscountRate(address,uint256,uint16)"(token?: null, tokenId?: null, discountRate?: null): UpdateERC1155DiscountRateEventFilter;
        UpdateERC1155DiscountRate(token?: null, tokenId?: null, discountRate?: null): UpdateERC1155DiscountRateEventFilter;
        "UpdateNFTDiscountRate(address,uint16)"(nft?: null, discountRate?: null): UpdateNFTDiscountRateEventFilter;
        UpdateNFTDiscountRate(nft?: null, discountRate?: null): UpdateNFTDiscountRateEventFilter;
        "UpdateUserDiscountRate(address,uint16)"(user?: null, discountRate?: null): UpdateUserDiscountRateEventFilter;
        UpdateUserDiscountRate(user?: null, discountRate?: null): UpdateUserDiscountRateEventFilter;
    };
    estimateGas: {
        getDiscountRate(target: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        getDiscountRate(target: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IDiscountDB.d.ts.map