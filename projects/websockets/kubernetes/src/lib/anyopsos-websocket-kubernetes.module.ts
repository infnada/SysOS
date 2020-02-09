import {SocketController, ConnectedSocket, SocketId, MessageBody, OnMessage, OnDisconnect, ReturnAck, SocketSessionParam} from 'socket-controllers';
import {getLogger, Logger} from 'log4js';
import {Socket} from 'socket.io';

import {AnyOpsOSKubernetesModule} from '@anyopsos/module-kubernetes';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';


const logger: Logger = getLogger('mainLog');

@SocketController()
export class AnyOpsOSKubernetesWebsocketController {

  @OnDisconnect()
  disconnect(@SocketId() id: string) {

    // TODO disconnect client sessions
  }

  @OnMessage('[kubernetes-disconnect]')
  @ReturnAck()
  kubernetesDisconnect(@ConnectedSocket() socket: Socket,
                       @SocketId() id: string,
                       @SocketSessionParam('userUuid') userUuid: string,
                       @SocketSessionParam('sessionId') sessionUuid: string,
                       @MessageBody() connectionData: { connectionUuid: string; workspaceUuid: string; }) {
    logger.info(`[Websocket kubernetes] -> disconnect -> id [${id}], connectionUuid [${connectionData.connectionUuid}], workspaceUuid [${connectionData.workspaceUuid}]`);

    const KubernetesModule: AnyOpsOSKubernetesModule = new AnyOpsOSKubernetesModule(userUuid, sessionUuid, connectionData.workspaceUuid, connectionData.connectionUuid);

    return KubernetesModule.disconnectConnection().then((result: BackendResponse) => {
      return result;
    }).catch((e: Error) => {
      return {status: 'error', data: e.toString()} as BackendResponse;
    });
  }

  @OnMessage('[kubernetes-session]')
  kubernetesNewSession(@ConnectedSocket() socket: Socket,
                       @SocketId() id: string,
                       @SocketSessionParam('userUuid') userUuid: string,
                       @SocketSessionParam('sessionId') sessionUuid: string,
                       @MessageBody() connectionData: { connectionUuid: string; workspaceUuid: string; }) {
    logger.info(`[Websocket kubernetes] -> newSession -> id [${id}], connectionUuid [${connectionData.connectionUuid}], workspaceUuid [${connectionData.workspaceUuid}]`);

    const KubernetesModule: AnyOpsOSKubernetesModule = new AnyOpsOSKubernetesModule(userUuid, sessionUuid, connectionData.workspaceUuid, connectionData.connectionUuid);

    return KubernetesModule.newConnection().then((result: BackendResponse) => {
      return result;
    }).catch((e: Error) => {
      return {status: 'error', data: e.toString()} as BackendResponse;
    });
  }

}
