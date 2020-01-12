import {SocketController, ConnectedSocket, SocketId, MessageBody, OnMessage, OnDisconnect, ReturnAck, SocketSessionParam} from 'socket-controllers';
import {getLogger, Logger} from 'log4js';
import {Socket} from 'socket.io';

import {ConnectionKubernetes, AnyOpsOSKubernetesModule} from '@anyopsos/module-kubernetes';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

const logger: Logger = getLogger('mainlog');

@SocketController()
export class AnyOpsOSKubernetesWebsocketController {

  @OnDisconnect()
  disconnect(@SocketId() id: string) {

    // TODO disconnect client sessions
  }

  @OnMessage('[kubernetes-session]')
  kubernetesNewSession(@ConnectedSocket() socket: Socket,
                       @SocketId() id: string,
                       @SocketSessionParam('userUuid') userUuid: string,
                       @SocketSessionParam('sessionID') sessionUuid: string,
                       @MessageBody() messageData: ConnectionKubernetes) {
    logger.info(`[Websocket kubernetes] -> newSession -> id [${id}], clusterServer [${messageData.clusterServer}]`);

    return new AnyOpsOSKubernetesModule(socket).newConnection(userUuid, sessionUuid, messageData).then((result: BackendResponse) => {
      return result;
    }).catch((e: Error) => {
      return {status: 'error', data: e.toString()} as BackendResponse;
    });
  }

  @OnMessage('[kubernetes-disconnect]')
  @ReturnAck()
  kubernetesDisconnect(@ConnectedSocket() socket: Socket,
                       @SocketId() id: string,
                       @MessageBody() connectionUuid: string) {
    logger.info(`[Websocket kubernetes] -> disconnect -> id [${id}], connectionUuid [${connectionUuid}]`);

    // TODO this.ConnectionsModule.closeConnection(data.type, data.uuid);
  }

}
