import {SocketController, ConnectedSocket, SocketId, MessageBody, OnMessage, OnDisconnect, ReturnAck, SocketSessionParam} from 'socket-controllers';
import {getLogger, Logger} from 'log4js';
import {Socket} from 'socket.io';
import validator from 'validator';

import {AnyOpsOSSnmpSocketModule, ConnectionSnmp} from '@anyopsos/module-snmp';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

const logger: Logger = getLogger('mainlog');

@SocketController()
export class AnyOpsOSSnmpWebsocketController {

  @OnDisconnect()
  disconnect(@SocketId() id: string) {

    // TODO disconnect client sessions
  }

  @OnMessage('[snmp-session]')
  dockerNewSession(@ConnectedSocket() socket: Socket,
                   @SocketId() id: string,
                   @SocketSessionParam('userUuid') userUuid: string,
                   @SocketSessionParam('sessionID') sessionUuid: string,
                   @MessageBody() messageData: ConnectionSnmp) {
    logger.info(`[Websocket snmp] -> newSession -> id [${id}], clusterServer [${messageData.host}]`);

    messageData.host = (
      validator.isIP(messageData.host) && messageData.host) ||
      (validator.isFQDN(messageData.host) && messageData.host) ||
      (/^(([a-z]|[A-Z]|[0-9]|[!^(){}\-_~])+)?\w$/.test(messageData.host) && messageData.host
      );

    return new AnyOpsOSSnmpSocketModule(socket).newConnection(userUuid, sessionUuid, messageData).then((result: BackendResponse) => {
      return result;
    }).catch((e: Error) => {
      return {status: 'error', data: e.toString()} as BackendResponse;
    });
  }

  @OnMessage('[snmp-disconnect]')
  @ReturnAck()
  dockerDisconnect(@ConnectedSocket() socket: Socket,
                   @SocketId() id: string,
                   @MessageBody() connectionUuid: string) {
    logger.info(`[Websocket snmp] -> disconnect -> id [${id}], connectionUuid [${connectionUuid}]`);

    // TODO this.ConnectionsModule.closeConnection(data.type, data.uuid);
  }

}
