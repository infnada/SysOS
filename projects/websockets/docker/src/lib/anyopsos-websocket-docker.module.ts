import {
  SocketController,
  ConnectedSocket,
  SocketId,
  MessageBody,
  OnMessage,
  OnDisconnect,
  ReturnAck,
  SocketSessionParam
} from 'socket-controllers';
import {getLogger, Logger} from 'log4js';
import {Socket} from 'socket.io';

import {ConnectionDocker, AnyOpsOSDockerModule} from '@anyopsos/module-docker';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

const logger: Logger = getLogger('mainlog');

@SocketController()
export class AnyOpsOSDockerWebsocketController {

  @OnDisconnect()
  disconnect(@SocketId() id: string) {

    // TODO disconnect client sessions
  }

  @OnMessage('[docker-session]')
  dockerNewSession(@ConnectedSocket() socket: Socket,
                   @SocketId() id: string,
                   @SocketSessionParam('userUuid') userUuid: string,
                   @SocketSessionParam('sessionID') sessionUuid: string,
                   @MessageBody() messageData: ConnectionDocker) {
    logger.info(`[Websocket docker] -> newSession -> id [${id}], clusterServer [${messageData.clusterServer}]`);

    return new AnyOpsOSDockerModule(socket).newConnection(userUuid, sessionUuid, messageData).then((result: BackendResponse) => {
      return result;
    }).catch((e: Error) => {
      return {status: 'error', data: e.toString()} as BackendResponse;
    });
  }

  @OnMessage('[docker-disconnect]')
  @ReturnAck()
  dockerDisconnect(@ConnectedSocket() socket: Socket,
                   @SocketId() id: string,
                   @MessageBody() connectionUuid: string) {
    logger.info(`[Websocket docker] -> disconnect -> id [${id}], connectionUuid [${connectionUuid}]`);

    // TODO this.ConnectionsModule.closeConnection(data.type, data.uuid);
  }

}
