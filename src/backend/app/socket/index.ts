import {getLogger} from 'log4js';

import {TerminalsModule} from './modules/terminals';
import {ConnectionsModule} from './modules/connections';
import {SshSocketModule} from './modules/ssh/ssh';

import {ConnectionSsh} from '../interfaces/socket-connections/connection-ssh';
import {ConnectionSftp} from '../interfaces/socket-connections/connection-sftp';
import {ConnectionLinux} from '../interfaces/socket-connections/connection-linux';
import {ConnectionSnmp} from '../interfaces/socket-connections/connection-snmp';
import {ConnectionKubernetes} from '../interfaces/socket-connections/connection-kubernetes';


const logger = getLogger('mainlog');

export class SocketModule {

  private TerminalsModule: TerminalsModule = new TerminalsModule(this.socket);
  private ConnectionsModule: ConnectionsModule = new ConnectionsModule(this.socket);
  private SshSocketModule: SshSocketModule = new SshSocketModule(this.socket);

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
    socket.on('[terminal-create]', (data: 'container_logs'|'container_shell'|'ssh', callback: (...args: any[]) => void) => {
      logger.info(`[Socket] -> Received message [terminal-create]`);
      this.TerminalsModule.createTerminal(data).then((terminalUuid: string) => {
        callback(terminalUuid);
      }).catch((e: Error) => {
        callback({status: 'error', data: e.toString()});
      });
    });

    socket.on('[terminal-delete]', (data: { uuid: string; }, callback: (...args: any[]) => any) => {
      logger.info(`[Socket] -> Received message [terminal-delete]`);
      this.TerminalsModule.deleteTerminal(data).catch((e: Error) => {
        callback({status: 'error', data: e.toString()});
      });
    });

    socket.on('[terminal-geometry]', (data: { uuid: string; cols: number; rows: number; }, callback: (...args: any[]) => any) => {
      logger.info(`[Socket] -> Received message [terminal-geometry]`);
      this.TerminalsModule.setTerminalGeometry(data).catch((e: Error) => {
        callback({status: 'error', data: e.toString()});
      });
    });

    socket.on('[terminal-stdin]', (data: { uuid: string; data: string; }, callback: (...args: any[]) => any) => {
      logger.info(`[Socket] -> Received message [terminal-stdin]`);
      this.TerminalsModule.terminalStdin(data).catch((e: Error) => {
        callback({status: 'error', data: e.toString()});
      });
    });

    /**
     * SSH
     */
    socket.on('[ssh-shell]', (data: { uuid: string; terminalUuid: string; }, callback: (...args: any[]) => any) => {
      logger.info(`[Socket] -> Received message [ssh-shell]`);
      this.SshSocketModule.createShellToTerminal(data.uuid, data.terminalUuid).then((state) => {
        callback(state);
      }).catch((e: Error) => {
        callback({status: 'error', data: e.toString()});
      });
    });

    socket.on('[ssh-sftp]', (data: { uuid: string; }, callback: (...args: any[]) => any) => {
      logger.info(`[Socket] -> Received message [ssh-sftp]`);
      this.SshSocketModule.createSftpClient(data.uuid).then((state) => {
        callback(state);
      }).catch((e: Error) => {
        callback({status: 'error', data: e.toString()});
      });
    });

    /**
     * Sessions SSH/SFTP/LINUX/SNMP/KUBERNETES/DOCKER
     */
    socket.on('[session-disconnect]', (data: {type: string, uuid: string}) => {
      logger.info(`[Socket] -> Received message [session-disconnect]`);
      this.ConnectionsModule.closeConnection(data.type, data.uuid);
    });

    socket.on('[session-new]', (sessionData: ConnectionSsh | ConnectionSftp | ConnectionLinux | ConnectionSnmp | ConnectionKubernetes, callback: (...args: any[]) => any) => {
      logger.info(`[Socket] -> Received message [session-new]`);

      this.ConnectionsModule.newConnection(sessionData).then(data => {
        return callback(data);
      }).catch((e) => {
        if (e && e.code) { return callback({status: 'error', data: e.code}); }
        if (e) { return callback({status: 'error', data: e.toString()}); }
      });
    });

  }

}
