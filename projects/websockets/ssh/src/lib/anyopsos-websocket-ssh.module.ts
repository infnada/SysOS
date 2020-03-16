import {SocketController, ConnectedSocket, SocketId, MessageBody, OnMessage, OnDisconnect, ReturnAck, SocketSessionParam} from 'socket-controllers';
import {getLogger, Logger} from 'log4js';
import {Socket} from 'socket.io';

import {AnyOpsOSSshModule} from '@anyopsos/module-ssh';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';


const logger: Logger = getLogger('mainLog');

@SocketController()
export class AnyOpsOSSshWebsocketController {

  @OnDisconnect()
  disconnect(@SocketId() id: string) {

    // TODO disconnect client sessions
  }

  @OnMessage('[ssh-shell]')
  @ReturnAck()
  sshShell(@ConnectedSocket() socket: Socket,
           @SocketId() id: string,
           @SocketSessionParam('userUuid') userUuid: string,
           @SocketSessionParam('sessionId') sessionUuid: string,
           @MessageBody() connectionData: { connectionUuid: string; workspaceUuid: string; terminalUuid: string;}) {
    logger.info(`[Websocket ssh] -> shell -> id [${id}], connectionUuid [${connectionData.connectionUuid}], workspaceUuid [${connectionData.workspaceUuid}], terminalUuid [${connectionData.terminalUuid}]`);

    const SshModule: AnyOpsOSSshModule = new AnyOpsOSSshModule(userUuid, sessionUuid, connectionData.workspaceUuid, connectionData.connectionUuid);

    return SshModule.createShellToTerminal(connectionData.terminalUuid).then((result: BackendResponse) => {
      return result;
    }).catch((e: Error) => {
      return {status: 'error', data: e.toString()} as BackendResponse;
    });
  }

  @OnMessage('[ssh-sftp]')
  @ReturnAck()
  sshSftp(@ConnectedSocket() socket: Socket,
          @SocketId() id: string,
          @SocketSessionParam('userUuid') userUuid: string,
          @SocketSessionParam('sessionId') sessionUuid: string,
          @MessageBody() connectionData: { connectionUuid: string; workspaceUuid: string; }) {
    logger.info(`[Websocket ssh] -> sftp -> id [${id}], connectionUuid [${connectionData.connectionUuid}], workspaceUuid [${connectionData.workspaceUuid}]`);

    const SshModule: AnyOpsOSSshModule = new AnyOpsOSSshModule(userUuid, sessionUuid, connectionData.workspaceUuid, connectionData.connectionUuid);

    return SshModule.createSftpClient().then((result: BackendResponse) => {
      return result;
    }).catch((e: Error) => {
      return {status: 'error', data: e.toString()} as BackendResponse;
    });
  }

  @OnMessage('[ssh-disconnect]')
  @ReturnAck()
  sshDisconnect(@ConnectedSocket() socket: Socket,
                @SocketId() id: string,
                @SocketSessionParam('userUuid') userUuid: string,
                @SocketSessionParam('sessionId') sessionUuid: string,
                @MessageBody() connectionData: { connectionUuid: string; workspaceUuid: string; }) {
    logger.info(`[Websocket ssh] -> disconnect -> id [${id}], connectionUuid [${connectionData.connectionUuid}], workspaceUuid [${connectionData.workspaceUuid}]`);

    const SshModule: AnyOpsOSSshModule = new AnyOpsOSSshModule(userUuid, sessionUuid, connectionData.workspaceUuid, connectionData.connectionUuid);

    return SshModule.disconnectConnection().then((result: BackendResponse) => {
      return result;
    }).catch((e: Error) => {
      return {status: 'error', data: e.toString()} as BackendResponse;
    });
  }

  @OnMessage('[ssh-session]')
  @ReturnAck()
  async sshNewSession(@ConnectedSocket() socket: Socket,
                      @SocketId() id: string,
                      @SocketSessionParam('userUuid') userUuid: string,
                      @SocketSessionParam('sessionId') sessionUuid: string,
                      @MessageBody() connectionData: { connectionUuid: string; workspaceUuid: string; }) {
    logger.info(`[Websocket ssh] -> newSession -> id [${id}], connectionUuid [${connectionData.connectionUuid}], workspaceUuid [${connectionData.workspaceUuid}]`);

    const SshModule: AnyOpsOSSshModule = new AnyOpsOSSshModule(userUuid, sessionUuid, connectionData.workspaceUuid, connectionData.connectionUuid);

    return SshModule.newConnection().then((result: BackendResponse) => {
      return result;
    }).catch((e: Error) => {
      return {status: 'error', data: e.toString()} as BackendResponse;
    });
  }

}
