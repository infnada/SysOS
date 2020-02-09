import {SocketController, ConnectedSocket, SocketId, MessageBody, OnMessage, OnDisconnect, ReturnAck, SocketSessionParam} from 'socket-controllers';
import {getLogger} from 'log4js';
import {Socket} from 'socket.io';

import {AnyOpsOSNetappModule} from '@anyopsos/module-netapp';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

const logger = getLogger('mainLog');

@SocketController()
export class AnyOpsOSNetappWebsocketController {

  @OnDisconnect()
  disconnect(@SocketId() id: string) {

    // TODO disconnect client sessions
  }

  @OnMessage('[netapp-disconnect]')
  @ReturnAck()
  netappDisconnect(@ConnectedSocket() socket: Socket,
                   @SocketId() id: string,
                   @SocketSessionParam('userUuid') userUuid: string,
                   @SocketSessionParam('sessionId') sessionUuid: string,
                   @MessageBody() connectionData: { connectionUuid: string; workspaceUuid: string; }) {
    logger.info(`[Websocket netapp] -> disconnect -> id [${id}], connectionUuid [${connectionData.connectionUuid}], workspaceUuid [${connectionData.workspaceUuid}]`);

    const NetappModule: AnyOpsOSNetappModule = new AnyOpsOSNetappModule(userUuid, sessionUuid, connectionData.workspaceUuid, connectionData.connectionUuid);

    return NetappModule.disconnectConnection().then((result: BackendResponse) => {
      return result;
    }).catch((e: Error) => {
      return {status: 'error', data: e.toString()} as BackendResponse;
    });
  }

  @OnMessage('[netapp-session]')
  @ReturnAck()
  netappNewSession(@ConnectedSocket() socket: Socket,
                   @SocketId() id: string,
                   @SocketSessionParam('userUuid') userUuid: string,
                   @SocketSessionParam('sessionId') sessionUuid: string,
                   @MessageBody() connectionData: { connectionUuid: string; workspaceUuid: string; }) {
    logger.info(`[Websocket netapp] -> newSession -> id [${id}], connectionUuid [${connectionData.connectionUuid}], workspaceUuid [${connectionData.workspaceUuid}]`);

    const NetappModule: AnyOpsOSNetappModule = new AnyOpsOSNetappModule(userUuid, sessionUuid, connectionData.workspaceUuid, connectionData.connectionUuid);

    return NetappModule.newConnection().then((result: BackendResponse) => {
      return result;
    }).catch((e: Error) => {
      return {status: 'error', data: e.toString()} as BackendResponse;
    });
  }

}
