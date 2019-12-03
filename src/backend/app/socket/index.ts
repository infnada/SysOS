import {getLogger} from 'log4js';

import {TerminalsModule} from './modules/terminals';
import {ConnectionsModule} from './modules/connections';

import {ConnectionSsh} from '../interfaces/socket-connections/connection-ssh';
import {ConnectionSftp} from '../interfaces/socket-connections/connection-sftp';
import {ConnectionLinux} from '../interfaces/socket-connections/connection-linux';
import {ConnectionSnmp} from '../interfaces/socket-connections/connection-snmp';
import {ConnectionKubernetes} from '../interfaces/socket-connections/connection-kubernetes';


const logger = getLogger('mainlog');

export class SocketModule {

  private TerminalsModule: TerminalsModule = new TerminalsModule(this.socket);
  private ConnectionsModule: ConnectionsModule = new ConnectionsModule(this.socket);

  constructor(private socket: any) {

    // if websocket connection arrives without an express session, kill it
    if (!socket.request.session) {
      logger.warn(`[Socket] -> Unauthorized`);
      socket.emit('401 UNAUTHORIZED');
      socket.disconnect(true);
      return;
    }

    // Default socket.io messages
    socket.on('disconnecting', (reason) => {
      logger.warn(`[Socket] -> Disconnecting [${reason}]`);
    });
    socket.on('disconnect', (reason) => {
      logger.warn(`[Socket] -> Disconnect [${reason}]`);
      this.ConnectionsModule.closeConnection(null, null);
    });
    socket.on('error', (err) => {
      logger.error(`[Socket] -> Error [${err}]`);
      this.ConnectionsModule.closeConnection(null, null);
    });

    /**
     *
     * MESSAGES
     *
     */

    /**
     *  Terminals
     */
    socket.on('[terminal-create]', (data: 'container_logs'|'container_shell'|'ssh', callback) => {
      logger.info(`[Socket] -> Received message [terminal-create]`);
      this.TerminalsModule.createTerminal(data).then((terminalUuid: string) => {
        callback(terminalUuid);
      });
    });

    socket.on('[terminal-delete]', (data: { uuid: string; }) => {
      logger.info(`[Socket] -> Received message [terminal-delete]`);
      this.TerminalsModule.deleteTerminal(data);
    });

    socket.on('[terminal-geometry]', (data: { uuid: string; cols: number; rows: number; }) => {
      logger.info(`[Socket] -> Received message [terminal-geometry]`);
      this.TerminalsModule.setTerminalGeometry(data);
    });

    socket.on('[terminal-stdin]', (data: { uuid: string; data: string; }) => {
      logger.info(`[Socket] -> Received message [terminal-stdin]`);
      this.TerminalsModule.terminalStdin(data);
    });
    /**
     * ----------
     */


    socket.on('[disconnect-session]', (data: {type: string, uuid: string}) => {
      logger.info(`[Socket] -> Received message [disconnect-session]`);
      this.ConnectionsModule.closeConnection(data.type, data.uuid);
    });

    socket.on('[new-session]', (data: ConnectionSsh | ConnectionSftp | ConnectionLinux | ConnectionSnmp | ConnectionKubernetes) => {
      logger.info(`[Socket] -> Received message [new-session]`);

      this.ConnectionsModule.newConnection(data).catch((e) => {
        if (e && e.code) { return console.log(e.code); }
        if (e) { return console.log(e); }
      });
    });

  }

}
