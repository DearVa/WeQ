import { Mirai, MiraiApiHttp, MiraiApiHttpSetting } from "mirai-ts";
export class MiraiHelper {
    public mirai: Mirai;
    public api: MiraiApiHttp;
    public initialize() {
        const settings: MiraiApiHttpSetting = {
            adapters: ["ws"],
            enableVerify: false,
            verifyKey: "WeQ",
            singleMode: false,
            cacheSize: 40960,
            adapterSettings: {
                ws: {
                    host: "localhost",
                    port: 13288,
                    reservedSyncId: "-1",
                },
                http: {
                    host: "localhost",
                    port: 13289,
                },
            },
        };
        this.mirai = new Mirai(settings);
        const api = (this.api = this.mirai.api);

        this.mirai.on("BotOnlineEvent", ({ qq }) => {
            console.log("BotOnlineEvent", qq);
            this.mirai.link(qq);
        });
        this.mirai.on("message", (msg) => {
            console.log("收到QQ消息", msg);
            // 复读
            msg.reply(msg.messageChain);
        });

        api.command
            .execute(["/login"])
            .then((res) => {
                console.log("login", res);
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
