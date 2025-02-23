import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IERC1271, IERC1271Interface } from "../../../../@openzeppelin/contracts/interfaces/IERC1271";
export declare class IERC1271__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IERC1271Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC1271;
}
//# sourceMappingURL=IERC1271__factory.d.ts.map