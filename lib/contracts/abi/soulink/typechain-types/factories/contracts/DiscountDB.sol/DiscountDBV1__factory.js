import { utils, Contract, ContractFactory } from "ethers";
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint16",
                name: "discountRate",
                type: "uint16",
            },
        ],
        name: "UpdateERC1155DiscountRate",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "nft",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint16",
                name: "discountRate",
                type: "uint16",
            },
        ],
        name: "UpdateNFTDiscountRate",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "user",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint16",
                name: "discountRate",
                type: "uint16",
            },
        ],
        name: "UpdateUserDiscountRate",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "ERC1155DiscountRate",
        outputs: [
            {
                internalType: "uint16",
                name: "",
                type: "uint16",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "target",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "getDiscountRate",
        outputs: [
            {
                internalType: "uint16",
                name: "discountRate",
                type: "uint16",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "nftDiscountRate",
        outputs: [
            {
                internalType: "uint16",
                name: "",
                type: "uint16",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "tokens",
                type: "address[]",
            },
            {
                internalType: "uint256[]",
                name: "tokenIds",
                type: "uint256[]",
            },
            {
                internalType: "uint16[]",
                name: "dcRates",
                type: "uint16[]",
            },
        ],
        name: "updateERC1155DiscountRate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "nfts",
                type: "address[]",
            },
            {
                internalType: "uint16[]",
                name: "dcRates",
                type: "uint16[]",
            },
        ],
        name: "updateNFTDiscountRate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "users",
                type: "address[]",
            },
            {
                internalType: "uint16[]",
                name: "dcRates",
                type: "uint16[]",
            },
        ],
        name: "updateUserDiscountRate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "userDiscountRate",
        outputs: [
            {
                internalType: "uint16",
                name: "",
                type: "uint16",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b5061001a3361001f565b61006f565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b610e4a8061007e6000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c80638da5cb5b116100665780638da5cb5b14610133578063a5d554261461014e578063e00165f614610161578063f2fde38b14610174578063fff9b6e41461018757600080fd5b806308228639146100a35780630f21b64d146100b857806355abd85f146100f4578063715018a6146101075780638bb81b881461010f575b600080fd5b6100b66100b1366004610b61565b6101b6565b005b6100dc6100c6366004610be2565b60026020526000908152604090205461ffff1681565b60405161ffff90911681526020015b60405180910390f35b6100dc610102366004610bff565b610367565b6100b66103b3565b6100dc61011d366004610be2565b60016020526000908152604090205461ffff1681565b6000546040516001600160a01b0390911681526020016100eb565b6100b661015c366004610b61565b6103c7565b6100b661016f366004610c84565b610568565b6100b6610182366004610be2565b610775565b6100dc610195366004610d1e565b600360209081526000928352604080842090915290825290205461ffff1681565b6101be6107ee565b8281146101e65760405162461bcd60e51b81526004016101dd90610d4a565b60405180910390fd5b60005b838110156103605761271083838381811061020657610206610d74565b905060200201602081019061021b9190610d8a565b61ffff16111561023d5760405162461bcd60e51b81526004016101dd90610dae565b82828281811061024f5761024f610d74565b90506020020160208101906102649190610d8a565b6002600087878581811061027a5761027a610d74565b905060200201602081019061028f9190610be2565b6001600160a01b031681526020810191909152604001600020805461ffff191661ffff929092169190911790557f90e1cf2212b3b64cf6606da957bc890ee69564957eb0714405290a042ef5545e8585838181106102ef576102ef610d74565b90506020020160208101906103049190610be2565b84848481811061031657610316610d74565b905060200201602081019061032b9190610d8a565b604080516001600160a01b03909316835261ffff90911660208301520160405180910390a161035981610dd4565b90506101e9565b5050505050565b6001600160a01b03831660009081526001602052604081205461ffff1681610390868686610848565b90508061ffff168261ffff16116103a757806103a9565b815b9695505050505050565b6103bb6107ee565b6103c56000610ac5565b565b6103cf6107ee565b8281146103ee5760405162461bcd60e51b81526004016101dd90610d4a565b60005b838110156103605761271083838381811061040e5761040e610d74565b90506020020160208101906104239190610d8a565b61ffff1611156104455760405162461bcd60e51b81526004016101dd90610dae565b82828281811061045757610457610d74565b905060200201602081019061046c9190610d8a565b6001600087878581811061048257610482610d74565b90506020020160208101906104979190610be2565b6001600160a01b031681526020810191909152604001600020805461ffff191661ffff929092169190911790557f8561a11657d0584f1887b0dab778cc40eb899e1a104b6faa24d7ed582f64e3ec8585838181106104f7576104f7610d74565b905060200201602081019061050c9190610be2565b84848481811061051e5761051e610d74565b90506020020160208101906105339190610d8a565b604080516001600160a01b03909316835261ffff90911660208301520160405180910390a161056181610dd4565b90506103f1565b6105706107ee565b84838114801561057f57508082145b61059b5760405162461bcd60e51b81526004016101dd90610d4a565b60005b8181101561076b576127108484838181106105bb576105bb610d74565b90506020020160208101906105d09190610d8a565b61ffff1611156105f25760405162461bcd60e51b81526004016101dd90610dae565b83838281811061060457610604610d74565b90506020020160208101906106199190610d8a565b600360008a8a8581811061062f5761062f610d74565b90506020020160208101906106449190610be2565b6001600160a01b03166001600160a01b03168152602001908152602001600020600088888581811061067857610678610d74565b90506020020135815260200190815260200160002060006101000a81548161ffff021916908361ffff1602179055507f4ed5c2d389659401d85f2ab469f7fb4ba621f3a6a80c414520d5e4ff9a80e7eb8888838181106106da576106da610d74565b90506020020160208101906106ef9190610be2565b87878481811061070157610701610d74565b9050602002013586868581811061071a5761071a610d74565b905060200201602081019061072f9190610d8a565b604080516001600160a01b039094168452602084019290925261ffff169082015260600160405180910390a161076481610dd4565b905061059e565b5050505050505050565b61077d6107ee565b6001600160a01b0381166107e25760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016101dd565b6107eb81610ac5565b50565b6000546001600160a01b031633146103c55760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016101dd565b600081810361085957506000610abe565b602082900361096357600061087083850185610be2565b90506001600160a01b0381161561095d576001600160a01b03811660009081526002602052604081205461ffff1692508290036108b1576000915050610abe565b6040516370a0823160e01b81526001600160a01b038681166004830152600091908316906370a0823190602401602060405180830381865afa1580156108fb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061091f9190610dfb565b1161095d5760405162461bcd60e51b815260206004820152600e60248201526d2727aa2fa7232a2fa427a62222a960911b60448201526064016101dd565b50610abe565b6040829003610a875760008061097b84860186610d1e565b90925090506001600160a01b03821615610a80576001600160a01b038216600090815260036020908152604080832084845290915281205461ffff1693508390036109cb57600092505050610abe565b604051627eeac760e11b81526001600160a01b038781166004830152602482018390526000919084169062fdd58e90604401602060405180830381865afa158015610a1a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a3e9190610dfb565b11610a805760405162461bcd60e51b81526020600482015260126024820152712727aa2fa2a92198989a9aafa427a62222a960711b60448201526064016101dd565b5050610abe565b60405162461bcd60e51b815260206004820152600c60248201526b494e56414c49445f4441544160a01b60448201526064016101dd565b9392505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60008083601f840112610b2757600080fd5b50813567ffffffffffffffff811115610b3f57600080fd5b6020830191508360208260051b8501011115610b5a57600080fd5b9250929050565b60008060008060408587031215610b7757600080fd5b843567ffffffffffffffff80821115610b8f57600080fd5b610b9b88838901610b15565b90965094506020870135915080821115610bb457600080fd5b50610bc187828801610b15565b95989497509550505050565b6001600160a01b03811681146107eb57600080fd5b600060208284031215610bf457600080fd5b8135610abe81610bcd565b600080600060408486031215610c1457600080fd5b8335610c1f81610bcd565b9250602084013567ffffffffffffffff80821115610c3c57600080fd5b818601915086601f830112610c5057600080fd5b813581811115610c5f57600080fd5b876020828501011115610c7157600080fd5b6020830194508093505050509250925092565b60008060008060008060608789031215610c9d57600080fd5b863567ffffffffffffffff80821115610cb557600080fd5b610cc18a838b01610b15565b90985096506020890135915080821115610cda57600080fd5b610ce68a838b01610b15565b90965094506040890135915080821115610cff57600080fd5b50610d0c89828a01610b15565b979a9699509497509295939492505050565b60008060408385031215610d3157600080fd5b8235610d3c81610bcd565b946020939093013593505050565b60208082526010908201526f13115391d51217d393d517d15455505360821b604082015260600190565b634e487b7160e01b600052603260045260246000fd5b600060208284031215610d9c57600080fd5b813561ffff81168114610abe57600080fd5b6020808252600c908201526b4f55545f4f465f52414e474560a01b604082015260600190565b600060018201610df457634e487b7160e01b600052601160045260246000fd5b5060010190565b600060208284031215610e0d57600080fd5b505191905056fea2646970667358221220c7e44e65eeed8cad49d7b11fc8d9ec6f065d53d37753476793223d7879b7d29f64736f6c634300080f0033";
const isSuperArgs = (xs) => xs.length > 1;
export class DiscountDBV1__factory extends ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static bytecode = _bytecode;
    static abi = _abi;
    static createInterface() {
        return new utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new Contract(address, _abi, signerOrProvider);
    }
}
//# sourceMappingURL=DiscountDBV1__factory.js.map