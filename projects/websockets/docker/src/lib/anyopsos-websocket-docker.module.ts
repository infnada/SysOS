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

import {AnyOpsOSNodeDockerModule} from '@anyopsos/module-node-docker';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';

const logger: Logger = getLogger('mainLog');

@SocketController()
export class AnyOpsOSDockerWebsocketController {

  @OnDisconnect()
  disconnect(@SocketId() id: string) {

    // TODO disconnect client sessions
  }

  @OnMessage('[docker-disconnect]')
  @ReturnAck()
  dockerDisconnect(@ConnectedSocket() socket: Socket,
                   @SocketId() id: string,
                   @SocketSessionParam('userUuid') userUuid: string,
                   @SocketSessionParam('sessionId') sessionUuid: string,
                   @MessageBody() connectionData: { connectionUuid: string; workspaceUuid: string; }) {
    logger.info(`[Websocket docker] -> disconnect -> id [${id}], connectionUuid [${connectionData.connectionUuid}], workspaceUuid [${connectionData.workspaceUuid}]`);

    const DockerModule: AnyOpsOSNodeDockerModule = new AnyOpsOSNodeDockerModule(userUuid, sessionUuid, connectionData.workspaceUuid, connectionData.connectionUuid);

    return DockerModule.disconnectConnection().then((result: BackendResponse) => {
      return result;
    }).catch((e: Error) => {
      return {status: 'error', data: e.toString()} as BackendResponse;
    });
  }

  @OnMessage('[docker-session]')
  @ReturnAck()
  dockerNewSession(@ConnectedSocket() socket: Socket,
                   @SocketId() id: string,
                   @SocketSessionParam('userUuid') userUuid: string,
                   @SocketSessionParam('sessionId') sessionUuid: string,
                   @MessageBody() connectionData: { connectionUuid: string; workspaceUuid: string; }) {
    logger.info(`[Websocket docker] -> newSession -> id [${id}], connectionUuid [${connectionData.connectionUuid}], workspaceUuid [${connectionData.workspaceUuid}]`);

    const DockerModule: AnyOpsOSNodeDockerModule = new AnyOpsOSNodeDockerModule(userUuid, sessionUuid, connectionData.workspaceUuid, connectionData.connectionUuid);

    return DockerModule.newConnection().then((result: BackendResponse) => {
      return result;
    }).catch((e: Error) => {
      return {status: 'error', data: e.toString()} as BackendResponse;
    });
  }

}
