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
const _bytecode = "0x608060405234801561001057600080fd5b5061001a3361001f565b61006f565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6109e28061007e6000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638bb81b881161005b5780638bb81b88146100f95780638da5cb5b1461011d578063a5d5542614610138578063f2fde38b1461014b57600080fd5b8063082286391461008d5780630f21b64d146100a257806355abd85f146100de578063715018a6146100f1575b600080fd5b6100a061009b36600461080f565b61015e565b005b6100c66100b0366004610890565b60026020526000908152604090205461ffff1681565b60405161ffff90911681526020015b60405180910390f35b6100c66100ec3660046108ad565b61034f565b6100a061039b565b6100c6610107366004610890565b60016020526000908152604090205461ffff1681565b6000546040516001600160a01b0390911681526020016100d5565b6100a061014636600461080f565b6103af565b6100a0610159366004610890565b610594565b61016661060d565b8281146101ad5760405162461bcd60e51b815260206004820152601060248201526f13115391d51217d393d517d15455505360821b60448201526064015b60405180910390fd5b60005b83811015610348576127108383838181106101cd576101cd610932565b90506020020160208101906101e29190610948565b61ffff1611156102235760405162461bcd60e51b815260206004820152600c60248201526b4f55545f4f465f52414e474560a01b60448201526064016101a4565b82828281811061023557610235610932565b905060200201602081019061024a9190610948565b6002600087878581811061026057610260610932565b90506020020160208101906102759190610890565b6001600160a01b031681526020810191909152604001600020805461ffff191661ffff929092169190911790557f90e1cf2212b3b64cf6606da957bc890ee69564957eb0714405290a042ef5545e8585838181106102d5576102d5610932565b90506020020160208101906102ea9190610890565b8484848181106102fc576102fc610932565b90506020020160208101906103119190610948565b604080516001600160a01b03909316835261ffff90911660208301520160405180910390a1806103408161096c565b9150506101b0565b5050505050565b6001600160a01b03831660009081526001602052604081205461ffff1681610378868686610667565b90508061ffff168261ffff161161038f5780610391565b815b9695505050505050565b6103a361060d565b6103ad6000610773565b565b6103b761060d565b8281146103f95760405162461bcd60e51b815260206004820152601060248201526f13115391d51217d393d517d15455505360821b60448201526064016101a4565b60005b838110156103485761271083838381811061041957610419610932565b905060200201602081019061042e9190610948565b61ffff16111561046f5760405162461bcd60e51b815260206004820152600c60248201526b4f55545f4f465f52414e474560a01b60448201526064016101a4565b82828281811061048157610481610932565b90506020020160208101906104969190610948565b600160008787858181106104ac576104ac610932565b90506020020160208101906104c19190610890565b6001600160a01b031681526020810191909152604001600020805461ffff191661ffff929092169190911790557f8561a11657d0584f1887b0dab778cc40eb899e1a104b6faa24d7ed582f64e3ec85858381811061052157610521610932565b90506020020160208101906105369190610890565b84848481811061054857610548610932565b905060200201602081019061055d9190610948565b604080516001600160a01b03909316835261ffff90911660208301520160405180910390a18061058c8161096c565b9150506103fc565b61059c61060d565b6001600160a01b0381166106015760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016101a4565b61060a81610773565b50565b6000546001600160a01b031633146103ad5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016101a4565b6000811561076c57600061067d83850185610890565b90506001600160a01b0381161561076a576001600160a01b03811660009081526002602052604081205461ffff1692508290036106be57600091505061076c565b6040516370a0823160e01b81526001600160a01b038681166004830152600091908316906370a0823190602401602060405180830381865afa158015610708573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061072c9190610993565b1161076a5760405162461bcd60e51b815260206004820152600e60248201526d2727aa2fa7232a2fa427a62222a960911b60448201526064016101a4565b505b9392505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60008083601f8401126107d557600080fd5b50813567ffffffffffffffff8111156107ed57600080fd5b6020830191508360208260051b850101111561080857600080fd5b9250929050565b6000806000806040858703121561082557600080fd5b843567ffffffffffffffff8082111561083d57600080fd5b610849888389016107c3565b9096509450602087013591508082111561086257600080fd5b5061086f878288016107c3565b95989497509550505050565b6001600160a01b038116811461060a57600080fd5b6000602082840312156108a257600080fd5b813561076c8161087b565b6000806000604084860312156108c257600080fd5b83356108cd8161087b565b9250602084013567ffffffffffffffff808211156108ea57600080fd5b818601915086601f8301126108fe57600080fd5b81358181111561090d57600080fd5b87602082850101111561091f57600080fd5b6020830194508093505050509250925092565b634e487b7160e01b600052603260045260246000fd5b60006020828403121561095a57600080fd5b813561ffff8116811461076c57600080fd5b60006001820161098c57634e487b7160e01b600052601160045260246000fd5b5060010190565b6000602082840312156109a557600080fd5b505191905056fea264697066735822122094d15b4c31ca3b95727cd9330108f06f1751a5a45a0561f68c267c919233e64a64736f6c634300080f0033";
const isSuperArgs = (xs) => xs.length > 1;
export class DiscountDBV0__factory extends ContractFactory {
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
//# sourceMappingURL=DiscountDBV0__factory.js.map