import {SocketController, ConnectedSocket, SocketId, MessageBody, OnMessage, OnDisconnect, ReturnAck, SocketSessionParam} from 'socket-controllers';
import {getLogger, Logger} from 'log4js';
import {Socket} from 'socket.io';

import {AnyOpsOSTerminalModule, TerminalTypes} from '@anyopsos/module-terminal';

import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

const logger: Logger = getLogger('mainlog');

@SocketController()
export class AnyOpsOSTerminalWebsocketController {

  @OnDisconnect()
  disconnect(@SocketId() id: string) {

    // TODO disconnect client sessions
  }

  @OnMessage('[terminal-create]')
  @ReturnAck()
  terminalCreateMessage(@ConnectedSocket() socket: Socket,
                        @SocketId() id: string,
                        @SocketSessionParam('userUuid') userUuid: string,
                        @SocketSessionParam('sessionID') sessionUuid: string,
                        @MessageBody() terminalType: TerminalTypes) {
    logger.info(`[Websocket terminal] -> create -> id [${id}], type [${terminalType}]`);

    return new AnyOpsOSTerminalModule(socket).createTerminal(userUuid, sessionUuid, terminalType).then((terminalUuid: string) => {
      return {status: 'ok', data: terminalUuid} as BackendResponse;
    }).catch((e: Error) => {
      return {status: 'error', data: e.toString()} as BackendResponse;
    });
  }

  @OnMessage('[terminal-delete]')
  @ReturnAck()
  terminalDeleteMessage(@ConnectedSocket() socket: Socket,
                        @SocketId() id: string,
                        @SocketSessionParam('userUuid') userUuid: string,
                        @SocketSessionParam('sessionID') sessionUuid: string,
                        @MessageBody() terminalUuid: string) {
    logger.info(`[Websocket terminal] -> delete -> id [${id}], terminalUuid [${terminalUuid}]`);

    new AnyOpsOSTerminalModule(socket).deleteTerminal(userUuid, sessionUuid, terminalUuid);
    return {status: 'ok'} as BackendResponse;
  }

  @OnMessage('[terminal-geometry]')
  @ReturnAck()
  terminalGeometryMessage(@ConnectedSocket() socket: Socket,
                          @SocketId() id: string,
                          @SocketSessionParam('userUuid') userUuid: string,
                          @SocketSessionParam('sessionID') sessionUuid: string,
                          @MessageBody() data: { terminalUuid: string; cols: number; rows: number; }) {
    logger.info(`[Websocket terminal] -> geometry -> id [${id}], terminalUuid [${data.terminalUuid}]`);

    new AnyOpsOSTerminalModule(socket).setTerminalGeometry(userUuid, sessionUuid, data);
    return {status: 'ok'} as BackendResponse;
  }

  @OnMessage('[terminal-stdin]')
  @ReturnAck()
  terminalStdinMessage(@ConnectedSocket() socket: Socket,
                       @SocketId() id: string,
                       @SocketSessionParam('userUuid') userUuid: string,
                       @SocketSessionParam('sessionID') sessionUuid: string,
                       @MessageBody() data: { terminalUuid: string; data: string; }) {
    logger.info(`[Websocket terminal] -> stdin -> id [${id}], terminalUuid [${data.terminalUuid}]`);

    new AnyOpsOSTerminalModule(socket).terminalStdin(userUuid, sessionUuid, data);
    return {status: 'ok', data: data.terminalUuid} as BackendResponse;
  }

}
