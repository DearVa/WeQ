import { Mirai, MiraiApiHttp, MiraiApiHttpSetting } from 'mirai-ts';

    export function MiraiHelp():MiraiHelper{
        return new MiraiHelper();
    }
export class MiraiHelper {
    
        public static mirai: Mirai;
        public static api: MiraiApiHttp;
        public initialize(){
            const settings: MiraiApiHttpSetting = {
                adapters: [
                    'ws'
                ],
                enableVerify: false,
                verifyKey: 'WeQ',
                singleMode: false,
                cacheSize: 40960,
                adapterSettings: {
                    ws: {
                        host: 'localhost',
                        port: 13288,
                        reservedSyncId: '-1'
                    },
                    http: {
                        host: 'localhost',
                        port: 13289,
                    }
                }
            }
            const mirai = MiraiHelper.mirai = new Mirai(settings);
            const api = MiraiHelper.api = MiraiHelper.mirai.api;
    
            mirai.on('BotOnlineEvent', ({ qq }) => {
                console.log('BotOnlineEvent', qq);
                MiraiHelper.mirai.link(qq);
            });
            mirai.on('message', (msg) => {
                console.log('收到QQ消息', msg);
                // 复读
                msg.reply(msg.messageChain);
            });
            
            api.command.execute([ '/login' ]).then((res) => {
                console.log('login', res);
            }).catch((err) => {
                console.error(err);
            });
        }
    }
