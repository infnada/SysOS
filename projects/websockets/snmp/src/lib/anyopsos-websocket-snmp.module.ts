import {SocketController, ConnectedSocket, SocketId, MessageBody, OnMessage, OnDisconnect, ReturnAck, SocketSessionParam} from 'socket-controllers';
import {getLogger, Logger} from 'log4js';
import {Socket} from 'socket.io';

import {AnyOpsOSNodeSnmpModule} from '@anyopsos/module-node-snmp';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';

const logger: Logger = getLogger('mainLog');

@SocketController()
export class AnyOpsOSSnmpWebsocketController {

  @OnDisconnect()
  disconnect(@SocketId() id: string) {

    // TODO disconnect client sessions
  }

  @OnMessage('[snmp-disconnect]')
  @ReturnAck()
  dockerDisconnect(@ConnectedSocket() socket: Socket,
                   @SocketId() id: string,
                   @SocketSessionParam('userUuid') userUuid: string,
                   @SocketSessionParam('sessionId') sessionUuid: string,
                   @MessageBody() connectionData: { connectionUuid: string; workspaceUuid: string; }) {
    logger.info(`[Websocket snmp] -> disconnect -> id [${id}], connectionUuid [${connectionData.connectionUuid}], workspaceUuid [${connectionData.workspaceUuid}]`);

    const SnmpModule: AnyOpsOSNodeSnmpModule = new AnyOpsOSNodeSnmpModule(userUuid, sessionUuid, connectionData.workspaceUuid, connectionData.connectionUuid);

    return SnmpModule.disconnectConnection().then((result: BackendResponse) => {
      return result;
    }).catch((e: Error) => {
      return {status: 'error', data: e.toString()} as BackendResponse;
    });
  }

  @OnMessage('[snmp-session]')
  @ReturnAck()
  dockerNewSession(@ConnectedSocket() socket: Socket,
                   @SocketId() id: string,
                   @SocketSessionParam('userUuid') userUuid: string,
                   @SocketSessionParam('sessionId') sessionUuid: string,
                   @MessageBody() connectionData: { connectionUuid: string; workspaceUuid: string; }) {
    logger.info(`[Websocket snmp] -> newSession -> id [${id}], connectionUuid [${connectionData.connectionUuid}], workspaceUuid [${connectionData.workspaceUuid}]`);

    const SnmpModule: AnyOpsOSNodeSnmpModule = new AnyOpsOSNodeSnmpModule(userUuid, sessionUuid, connectionData.workspaceUuid, connectionData.connectionUuid);

    return SnmpModule.newConnection().then((result: BackendResponse) => {
      return result;
    }).catch((e: Error) => {
      return {status: 'error', data: e.toString()} as BackendResponse;
    });
  }

}
