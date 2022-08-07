import { DomNode, el } from "skydapp-browser";
import { View } from "skydapp-common";
import Loading from "../../components/Loading";
import SoulDisplay from "../../components/SoulDisplay";
import Config from "../../Config";
import SoulinkContract from "../../contracts/SoulinkContract";
import Bio from "../../datamodel/Bio";
import LinkRequest from "../../datamodel/LinkRequest";
import Wallet from "../../network/Wallet";
import Alert from "../../popup/Alert";
import AdminLayout from "./AdminLayout";

export default class SoulsSetting extends View {

    private container: DomNode | undefined;
    private toLinkContainer: DomNode | undefined;
    private toAcceptContainer: DomNode | undefined;
    private linkedContainer: DomNode | undefined;

    constructor() {
        super();
        this.load();
    }

    private async load() {
        await AdminLayout.current.ready(async () => {
            if (this.closed !== true) {

                let loading;
                AdminLayout.current.content.append(this.container = el(".souls-setting-view",
                    this.toLinkContainer = el(".soul-list.to-link-container"),
                    this.toAcceptContainer = el(".soul-list.to-accept-container"),
                    this.linkedContainer = el(".soul-list.linked-container"),
                    loading = el(".loading"),
                ));

                (async () => {
                    const result = await fetch(`${Config.apiURI}/linked/${AdminLayout.current.address}`);
                    const linked: Bio[] = await result.json();
                    const linkedAddresses: string[] = [];

                    for (const bio of linked) {
                        const address = bio.id!;
                        new SoulDisplay(address, AdminLayout.current.bio.color, el("a.unlink", el("i.fa-solid.fa-link-slash"), {
                            click: async () => {
                                await SoulinkContract.breakLink(await SoulinkContract.getTokenId(address));
                                new Alert("The transaction has been registered. Please wait until it is finished.");
                            },
                        })).appendTo(this.linkedContainer!);
                        linkedAddresses.push(address);
                    }

                    const promises: Promise<void>[] = [];
                    promises.push(this.loadRequestTo(linkedAddresses));
                    promises.push(this.loadRequestFrom(linkedAddresses));
                    await Promise.all(promises);
                    loading.delete();
                })();
            }
        });
    }

    private async loadRequestTo(linkedAddresses: string[]) {

        const result = await fetch(`${Config.apiURI}/requestto/${AdminLayout.current.address}`);
        const requests: LinkRequest[] = await result.json();

        for (const request of requests) {
            if (linkedAddresses.includes(request.requester) !== true && request.accept === undefined) {
                const requestDisplay = new SoulDisplay(request.requester, AdminLayout.current.bio.color,
                    el("a", el("i.fa-solid.fa-check"), {
                        click: async () => {
                            const deadline = Math.floor(Date.now() / 1000) + 315360000; // +10년
                            const signature = await Wallet.signTypedData(AdminLayout.current.address, "Soulink", "1", SoulinkContract.address, "RequestLink", [
                                { name: "to", type: "address" },
                                { name: "deadline", type: "uint256" },
                            ], {
                                to: request.requester,
                                deadline,
                            });
                            await fetch(`${Config.apiURI}/accept`, {
                                method: "POST",
                                body: JSON.stringify({
                                    requester: request.requester,
                                    target: AdminLayout.current.address,
                                    signature,
                                    deadline,
                                }),
                            });
                            requestDisplay.delete();
                        },
                    }),
                    el("a", el("i.fa-solid.fa-xmark"), {
                        click: async () => {
                            const signedMessage = await Wallet.signMessage("Cancel the link request.");
                            const loading = new Loading("Canceling...").appendTo(this.container!);
                            await fetch(`${Config.apiURI}/cancel`, {
                                method: "POST",
                                body: JSON.stringify({
                                    signedMessage,
                                    requester: request.requester,
                                    target: AdminLayout.current.address,
                                }),
                            });
                            loading.delete();
                            requestDisplay.delete();
                        },
                    }),
                ).appendTo(this.toAcceptContainer!);
            }
        }
    }

    private async loadRequestFrom(linkedAddresses: string[]) {

        const result = await fetch(`${Config.apiURI}/requestfrom/${AdminLayout.current.address}`);
        const requests: LinkRequest[] = await result.json();

        for (const request of requests) {
            if (linkedAddresses.includes(request.target) !== true && request.accept !== undefined) {
                new SoulDisplay(request.target, AdminLayout.current.bio.color, el("a.link", el("i.fa-solid.fa-link"), {
                    click: async () => {
                        await SoulinkContract.setLink(await SoulinkContract.getTokenId(request.target), [
                            request.signature,
                            request.accept!.signature,
                        ], [
                            request.deadline,
                            request.accept!.deadline,
                        ]);
                        new Alert("The transaction has been registered. Please wait until it is finished.");
                    },
                })).appendTo(this.toLinkContainer!);
            }
        }
    }

    public close(): void {
        this.container?.delete();
        super.close();
    }
}
