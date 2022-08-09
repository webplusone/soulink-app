import { msg, SkyRouter } from "skydapp-browser";
import superagent from "superagent";
import AdminLayout from "./view/admin/AdminLayout";
import AppearanceSetting from "./view/admin/AppearanceSetting";
import BioLinksSetting from "./view/admin/BioLinksSetting";
import SoulsSetting from "./view/admin/SoulsSetting";
import BioLinks from "./view/BioLinks";
import BusinessCard from "./view/BusinessCard";
import Galaxy from "./view/Galaxy";
import Intro from "./view/Intro";
import Layout from "./view/Layout";
import Mint from "./view/Mint";
import MintFailed from "./view/MintFailed";
import MintSuccess from "./view/MintSuccess";
import NFTs from "./view/NFTs";
import DiscountSetting from "./view/owner/DiscountSetting";
import OwnerLayout from "./view/owner/OwnerLayout";
import Souls from "./view/Souls";

(async () => {
    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
    msg.parseCSV((await superagent.get("/msg.csv")).text);

    SkyRouter.route("", Intro);
    SkyRouter.route("mint", Mint);
    SkyRouter.route("mint/success", MintSuccess);
    SkyRouter.route("mint/failed", MintFailed);
    SkyRouter.route("galaxy", Galaxy);

    SkyRouter.route([
        "{addressOrEns}", "{addressOrEns}/links",
        "{addressOrEns}/nfts",
        "{addressOrEns}/souls",
        "{addressOrEns}/card",
    ], Layout, [
        "mint", "owner", "galaxy",
        "me", "my/links", "my/souls",
        "admin", "admin/links", "admin/souls",
    ]);

    SkyRouter.route(["{addressOrEns}", "{addressOrEns}/links"], BioLinks, [
        "mint", "owner", "galaxy",
        "me", "my/links",
        "admin", "admin/links",
    ]);

    SkyRouter.route("{addressOrEns}/nfts", NFTs);
    SkyRouter.route("{addressOrEns}/souls", Souls, ["my/souls", "admin/souls"]);
    SkyRouter.redirect("{addressOrEns}/soulmates", "{addressOrEns}/souls");
    SkyRouter.route("{addressOrEns}/card", BusinessCard);

    // admin
    SkyRouter.route([
        "me", "my/links",
        "my/nfts",
        "my/appearance",
        "my/souls",
    ], AdminLayout);

    SkyRouter.route(["me", "my/links"], BioLinksSetting);
    SkyRouter.route("my/appearance", AppearanceSetting);
    SkyRouter.route("my/souls", SoulsSetting);

    SkyRouter.redirect(["admin", "admin/links"], "me");
    SkyRouter.redirect("admin/appearance", "my/appearance");
    SkyRouter.redirect("admin/souls", "my/souls");

    // owner
    SkyRouter.route([
        "owner", "owner/discount",
    ], OwnerLayout);

    SkyRouter.route(["owner", "owner/discount"], DiscountSetting);
})();
