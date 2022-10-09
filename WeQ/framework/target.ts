import { MsgBase, QQMsg } from "./msg";
import { MiraiHelper as mh } from './mirai_helper';

/**
 * 发送消息的目标，也就是好友或者群
 */ 
export abstract class TargetBase {
    /**
     * 名称
     */
    name: string;

    /**
     * 备注名
     */
    remark: string;
    
    /**
     * 头像
     */
    avatarUrl: string;

    abstract sendMsg(msg: MsgBase): Promise<void>;
}

export abstract class QQTarget extends TargetBase {
    /**
     * QQ号或者群号
     */
    idNumber: number;
}

export class QQGroupTarget extends QQTarget {
    async sendMsg(msg: MsgBase) {
        await mh.api.sendGroupMessage(msg.msg, this.idNumber);
    }
}

export class QQFriendTarget extends QQTarget {
    async sendMsg(msg: MsgBase) {
        await mh.api.sendFriendMessage(msg.msg, this.idNumber);
    }
}

export class QQTempTarget extends QQTarget {
    /**
     * 临时会话群号
     */
    groupNumber: number;

    async sendMsg(msg: MsgBase) {
        await mh.api.sendTempMessage(msg.msg, this.idNumber, this.groupNumber);
    }
}

export abstract class WeChatTarget extends TargetBase {
    /**
     * QQ号或者群号
     */
    idNumber: number;
}

export abstract class WeChatGroupTarget extends WeChatTarget {
    
}

export abstract class WeChatFriendTarget extends WeChatTarget {
    
}
