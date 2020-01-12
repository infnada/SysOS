import {SocketController, ConnectedSocket, SocketId, MessageBody, OnMessage} from 'socket-controllers';
import {getLogger} from 'log4js';
import {Socket} from 'socket.io';

const logger = getLogger('mainlog');

@SocketController()
export class AnyOpsOSLinuxWebsocketController {

  // TODO
  @OnMessage('[linux-session]')
  newMessageReceived(@ConnectedSocket() socket: Socket,
                     @SocketId() id: string,
                     @MessageBody() message: any) {
    logger.info(`[Websocket linux] -> new message -> id [${id}]`);

    socket.emit('message_received', message);
  }

}
