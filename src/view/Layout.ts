import { BodyNode, DomNode, el, ResponsiveImage, SkyRouter } from "skydapp-browser";
import { SkyUtil, View, ViewParams } from "skydapp-common";
import Loading from "../components/Loading";
import NotExistsDisplay from "../components/NotExistsDisplay";
import Config from "../Config";
import SoulinkContract from "../contracts/SoulinkContract";
import Bio from "../datamodel/Bio";
import NFTInfo from "../datamodel/NFTInfo";
import NetworkProvider from "../network/NetworkProvider";
import Wallet from "../network/Wallet";

export default class Layout extends View {

    public static current: Layout;
    public content: DomNode;

    private profile: DomNode;
    private container: DomNode;

    private addressOrEns: string = "";
    public bio: Bio = { links: [] };
    public nfts: NFTInfo[] = [];

    private currentLink: DomNode | undefined;
    private links: { [name: string]: DomNode } = {};

    constructor(params: ViewParams, uri: string) {
        super();
        Layout.current = this;

        BodyNode.append(this.container = el(".layout",
            el("header",
                this.links["links"] = el("a", "Links", { click: () => { SkyRouter.go(`/${this.addressOrEns}`, undefined, true) } }),
                this.links["nfts"] = el("a", "NFTs", { click: () => { SkyRouter.go(`/${this.addressOrEns}/nfts`, undefined, true) } }),
            ),
            el("main",
                this.profile = el(".profile"),
                this.content = el(".content"),
            ),
            el("footer",
                el("a", new ResponsiveImage("img", "/images/bottom-logo.png"), {
                    click: () => SkyRouter.go("/"),
                }),
                el(".sns",
                    el("a", "Twitter", { href: "https://twitter.com/soulinksbt", target: "_blank" }),
                    el("a", "Discord", { href: "https://discord.gg/u9hzMr848H", target: "_blank" }),
                ),
            ),
        ));
        this.highlight(uri);
    }

    public async ready(addressOrEns: string, proc: () => Promise<void>) {
        const loading = new Loading("Loading...").appendTo(BodyNode);
        const result = await fetch(`${Config.apiURI}/cached/${addressOrEns}`);
        const str = await result.text();

        this.content.empty();
        this.profile.empty();

        if (str === "") {
            document.title = "Soulink | Page Not Found";
            this.content.append(new NotExistsDisplay());
        } else {
            document.title = `${addressOrEns.indexOf("0x") === 0 ? SkyUtil.shortenAddress(addressOrEns) : addressOrEns} | Soulink`;
            const data = JSON.parse(str);
            this.addressOrEns = addressOrEns;
            this.bio = data.bio;
            this.nfts = data.nfts;
            this.showLinkButton(addressOrEns);
            await proc();
        }
        loading.delete();
    }

    private async showLinkButton(addressOrEns: string) {
        const walletAddress = await Wallet.loadAddress();
        if (walletAddress !== undefined) {
            const address = await NetworkProvider.resolveName(addressOrEns);
            if (address !== walletAddress) {
                this.profile.append(el("a", "Request Soulink", {
                    click: async () => {
                        const deadline = Math.floor(Date.now() / 1000) + 315360000; // +10년
                        const signature = await Wallet.signTypedData(walletAddress, "Soulink", "1", SoulinkContract.address, "RequestLink", [
                            { name: "to", type: "address" },
                            { name: "deadline", type: "uint256" },
                        ], {
                            to: address,
                            deadline,
                        });
                        await fetch(`${Config.apiURI}/request`, {
                            method: "POST",
                            body: JSON.stringify({
                                requester: walletAddress,
                                target: address,
                                signature,
                                deadline,
                            }),
                        });
                    },
                }));
            }
        }
    }

    private highlight(uri: string) {
        this.currentLink?.deleteClass("on");
        if (uri.indexOf("/") === -1) {
            this.currentLink = this.links["links"];
        } else {
            uri = uri.substring(uri.indexOf("/") + 1);
            this.currentLink = this.links[uri.substring(uri.indexOf("/") + 1)];
        }
        this.currentLink?.addClass("on");
    }

    public changeParams(params: ViewParams, uri: string): void {
        this.highlight(uri);
    }

    public close(): void {
        this.container.delete();
    }
}