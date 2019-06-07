import {getLogger} from 'log4js';

import {ConnectionsModule} from './modules/connections';
import {Connection} from '../interfaces/connection';

const logger = getLogger('mainlog');

export class SocketModule {

  ConnectionsModule: ConnectionsModule = new ConnectionsModule(this.socket);

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
    socket.on('[disconnect-session]', (data: {type: string, uuid: string}) => {
      logger.info(`[Socket] -> Received message [disconnect-session]`);
      this.ConnectionsModule.closeConnection(data.type, data.uuid);
    });

    socket.on('[new-session]', (data: Connection) => {
      logger.info(`[Socket] -> Received message [new-session]`);
      this.ConnectionsModule.newConnection(data);
    });

  }

}
