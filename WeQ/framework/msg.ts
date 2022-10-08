import { Mirai, MessageType } from 'mirai-ts';

export abstract class MsgBase {
    /**
     * 先暂时用这个，挺全的
     */
    msg: MessageType.MessageChain;

    constructor(msg: MessageType.MessageChain) {
        this.msg = msg;
    }

    /**
     * 用msg回复此条消息（引用）
     */
    abstract reply(msg: MsgBase): Promise<void>;

    /**
     * 撤回消息
     */
    abstract undo(): void;
}

export class QQMsg extends MsgBase {
    private qqMsg: MessageType.ChatMessage;

    constructor(msg: MessageType.ChatMessage) {
        super(msg.messageChain);
        this.qqMsg = msg;
    }

    async reply(msg: MsgBase) {
        this.qqMsg.reply(msg.msg);
    }

    undo() {
        throw "No Implement Exception"
    }
}

export class WeChatMsg extends MsgBase {
    private weChagMsg : MessageType.ChatMessage;

    constructor(msg: MessageType.ChatMessage){
        super(msg.messageChain)
        this.weChagMsg = msg;
    }

    async reply(msg: MsgBase) {
        this.weChagMsg.reply(msg.msg)
    }

    undo() {
        throw "No Implement Exception"
    }
}