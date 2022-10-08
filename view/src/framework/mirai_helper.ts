import { Mirai, MessageType, MiraiApiHttp } from 'mirai-ts';

export class MiraiHelper {
    public static mirai: Mirai;

    public static api: MiraiApiHttp;

    public static initialize(): void {
        this.mirai = new Mirai();
        this.api = this.mirai.api;
    }
}