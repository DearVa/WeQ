import * as websocket from 'ws';
import * as Logger from './logger';

export class Server {
    static wss: websocket.Server;

    static async launch(port: number) {
        if (this.wss) {
            return;
        }
        this.wss = await this.checkPortAndCreateWs(port);
        Logger.info('Server launched at port ' + port);

        this.wss.on('connection', async (ws: WebSocket) => {
            let isHandshakeSucceed = false;

            ws.onmessage = async (event: MessageEvent): Promise<void> => {
                // type: connect, disconnect JSON Schema
                // connectionId: connect or disconnect connectionId

                // type: offer, answer, candidate JSON Schema
                // from: from connection id
                // to: to connection id
                // data: any message data structure

                const msg = JSON.parse(event.data);
                if (!msg) {
                    return;
                }
                Logger.log('客户发来ws消息 ', msg);

                switch (msg.type) {
                    case 'connect':
                        switch (msg.from) {
                            case 'mirai':
                                Logger.log('mirai已连接');
                                break;
                            case 'wechaty':
                                break;
                            default:
                                ws.close();
                                return;
                        }
                        isHandshakeSucceed = true;
                        break;
                    case 'heartbeat':
                        break;
                    default:
                        Logger.warn("Unknown message " + msg);
                        break;
                }
            };

            await new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
                if (!isHandshakeSucceed) {
                    Logger.warn("Client not send connect message within 1 second. Closing...");
                    ws.close();
                }
            });
        });
    }

    private static checkPortAndCreateWs(port: number): Promise<websocket.Server> {
        return new Promise<websocket.Server>((resolve, reject) => {
            const s = new websocket.Server({ port: port });
            s.on('listening', () => {
                resolve(s);
            });
            s.on('error', e => reject(e));
        });
    }

    static stop() {
        this.wss.clients.forEach((socket) => {
            socket.terminate();
        });
        Logger.info('Server closed');
    }
}