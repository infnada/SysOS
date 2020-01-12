import {SocketController, ConnectedSocket, SocketId, MessageBody, OnMessage, OnDisconnect, ReturnAck, SocketSessionParam} from 'socket-controllers';
import {getLogger, Logger} from 'log4js';
import {Socket} from 'socket.io';
import validator from 'validator';

import {AnyOpsOSGetPathModule} from '@anyopsos/module-get-path';
import {AnyOpsOSConfigFileModule} from '@anyopsos/module-config-file';
import {AnyOpsOSCredentialModule} from '@anyopsos/module-credential';
import {AnyOpsOSSshModule, ConnectionSftp, ConnectionSsh, SshServer} from '@anyopsos/module-ssh';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

const logger: Logger = getLogger('mainlog');

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
           @SocketSessionParam('sessionID') sessionUuid: string,
           @MessageBody() data: { connectionUuid: string; terminalUuid: string; }) {
    logger.info(`[Websocket ssh] -> shell -> id [${id}], connectionUuid [${data.connectionUuid}], terminalUuid [${data.terminalUuid}]`);

    return new AnyOpsOSSshModule(socket).createShellToTerminal(userUuid, sessionUuid, data.connectionUuid, data.terminalUuid).then((result: BackendResponse) => {
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
          @SocketSessionParam('sessionID') sessionUuid: string,
          @MessageBody() connectionUuid: string) {
    logger.info(`[Websocket ssh] -> sftp -> id [${id}], connectionUuid [${connectionUuid}]`);

    return new AnyOpsOSSshModule(socket).createSftpClient(userUuid, sessionUuid, connectionUuid).then((result: BackendResponse) => {
      return result;
    }).catch((e: Error) => {
      return {status: 'error', data: e.toString()} as BackendResponse;
    });
  }

  @OnMessage('[ssh-disconnect]')
  @ReturnAck()
  sshDisconnect(@ConnectedSocket() socket: Socket,
                @SocketId() id: string,
                @MessageBody() connectionUuid: string) {
    logger.info(`[Websocket ssh] -> disconnect -> id [${id}], connectionUuid [${connectionUuid}]`);

    // TODO this.ConnectionsModule.closeConnection(data.type, data.uuid);
  }

  @OnMessage('[ssh-session]')
  @ReturnAck()
  async sshNewSession(@ConnectedSocket() socket: Socket,
                      @SocketId() id: string,
                      @SocketSessionParam('userUuid') userUuid: string,
                      @SocketSessionParam('sessionID') sessionUuid: string,
                      @MessageBody() messageData: ConnectionSsh | ConnectionSftp) {
    logger.info(`[Websocket ssh] -> newSession -> id [${id}], host [${messageData.host}]`);

    messageData.host = (
      validator.isIP(messageData.host) && messageData.host) ||
      (validator.isFQDN(messageData.host) && messageData.host) ||
      (/^(([a-z]|[A-Z]|[0-9]|[!^(){}\-_~])+)?\w$/.test(messageData.host) && messageData.host
    );

    const mainConfig: { [key: string]: any; } = await new AnyOpsOSConfigFileModule().get(new AnyOpsOSGetPathModule().mainConfig);

    const mainServer: SshServer = {
      host: messageData.host,
      port: (validator.isInt(messageData.port.toString(), {min: 1, max: 65535}) && messageData.port) || mainConfig.ssh.port,
      credential: await new AnyOpsOSCredentialModule().getCredential(socket.request.session.uuid, socket.request.session.sessionId, messageData.credential)
    };

    return new AnyOpsOSSshModule(socket).newConnection(
      userUuid,
      sessionUuid,
      messageData.uuid,
      messageData.type,
      mainServer,
      messageData.hopServerUuid
    ).then((result: BackendResponse) => {
      return result;
    }).catch((e: Error) => {
      return {status: 'error', data: e.toString()} as BackendResponse;
    });
  }

}
