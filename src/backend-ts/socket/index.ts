import {ConnectionsModule} from './modules/connections';
import {Connection} from '../interfaces/connection';

export class SocketModule {

  ConnectionsModule: ConnectionsModule = new ConnectionsModule(this.socket);

  constructor(private socket: any) {

    // if websocket connection arrives without an express session, kill it
    if (!socket.request.session) {
      socket.emit('401 UNAUTHORIZED');
      socket.disconnect(true);
      return;
    }

    // Default socket.io messages
    socket.on('disconnecting', (reason) => {
    });
    socket.on('disconnect', (reason) => {
      this.ConnectionsModule.closeConnection(null, null);
    });
    socket.on('error', (err) => {
      this.ConnectionsModule.closeConnection(null, null);
    });

    /**
     *
     * MESSAGES
     *
     */
    socket.on('[disconnect-session]', (data: {type: string, uuid: string}) => {
      this.ConnectionsModule.closeConnection(data.type, data.uuid);
    });

    socket.on('[new-session]', (data: Connection) => {
      this.ConnectionsModule.newConnection(data);
    });

  }

}
