import {SocketController, ConnectedSocket, SocketId, MessageBody, OnMessage, OnDisconnect, ReturnAck, SocketSessionParam} from 'socket-controllers';
import {getLogger, Logger} from 'log4js';
import {Socket} from 'socket.io';

import {AnyOpsOSTerminalModule, TerminalTypes} from '@anyopsos/module-terminal';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';


const logger: Logger = getLogger('mainLog');

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
                        @SocketSessionParam('sessionId') sessionUuid: string,
                        @MessageBody() terminalData: { connectionUuid: string; workspaceUuid: string; terminalType: TerminalTypes; }) {
    logger.info(`[Websocket terminal] -> create -> id [${id}], connectionUuid [${terminalData.connectionUuid}], workspaceUuid [${terminalData.workspaceUuid}], type [${terminalData.terminalType}]`);

    const TerminalsModule: AnyOpsOSTerminalModule = new AnyOpsOSTerminalModule(userUuid, sessionUuid, terminalData.workspaceUuid, terminalData.connectionUuid);

    return TerminalsModule.createTerminal(socket, terminalData.terminalType).then((terminalUuid: string) => {
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
                        @SocketSessionParam('sessionId') sessionUuid: string,
                        @MessageBody() terminalData: { connectionUuid: string; workspaceUuid: string; terminalUuid: string; }) {
    logger.info(`[Websocket terminal] -> delete -> id [${id}], connectionUuid [${terminalData.connectionUuid}], workspaceUuid [${terminalData.workspaceUuid}], terminalUuid [${terminalData.terminalUuid}]`);

    const TerminalsModule: AnyOpsOSTerminalModule = new AnyOpsOSTerminalModule(userUuid, sessionUuid, terminalData.workspaceUuid, terminalData.connectionUuid);

    return TerminalsModule.deleteTerminal(terminalData.terminalUuid).then(() => {
      return {status: 'ok', data: terminalData.terminalUuid} as BackendResponse;
    }).catch((e: Error) => {
      return {status: 'error', data: e.toString()} as BackendResponse;
    });
  }

  @OnMessage('[terminal-geometry]')
  @ReturnAck()
  terminalGeometryMessage(@ConnectedSocket() socket: Socket,
                          @SocketId() id: string,
                          @SocketSessionParam('userUuid') userUuid: string,
                          @SocketSessionParam('sessionId') sessionUuid: string,
                          @MessageBody() terminalData: { connectionUuid: string; workspaceUuid: string; terminalUuid: string; cols: number; rows: number; }) {
    logger.info(`[Websocket terminal] -> geometry -> id [${id}], connectionUuid [${terminalData.connectionUuid}], workspaceUuid [${terminalData.workspaceUuid}], terminalUuid [${terminalData.terminalUuid}]`);

    const TerminalsModule: AnyOpsOSTerminalModule = new AnyOpsOSTerminalModule(userUuid, sessionUuid, terminalData.workspaceUuid, terminalData.connectionUuid);

    TerminalsModule.setTerminalGeometry(terminalData.terminalUuid, terminalData.cols, terminalData.rows);
    return {status: 'ok'} as BackendResponse;
  }

  @OnMessage('[terminal-stdin]')
  @ReturnAck()
  terminalStdinMessage(@ConnectedSocket() socket: Socket,
                       @SocketId() id: string,
                       @SocketSessionParam('userUuid') userUuid: string,
                       @SocketSessionParam('sessionId') sessionUuid: string,
                       @MessageBody() terminalData: { connectionUuid: string; workspaceUuid: string; terminalUuid: string; data: string; }) {
    logger.info(`[Websocket terminal] -> stdin -> id [${id}], connectionUuid [${terminalData.connectionUuid}], workspaceUuid [${terminalData.workspaceUuid}], terminalUuid [${terminalData.terminalUuid}]`);

    const TerminalsModule: AnyOpsOSTerminalModule = new AnyOpsOSTerminalModule(userUuid, sessionUuid, terminalData.workspaceUuid, terminalData.connectionUuid);

    TerminalsModule.terminalStdin(terminalData.terminalUuid, terminalData.data);
    return {status: 'ok', data: terminalData.terminalUuid} as BackendResponse;
  }

}
