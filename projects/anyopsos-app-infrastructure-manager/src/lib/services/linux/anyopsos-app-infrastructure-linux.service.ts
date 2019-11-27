import {Injectable} from '@angular/core';

import {Socket} from 'ngx-socket-io';

import {ConnectionLinux} from '../../types/connections/connection-linux';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureLinuxService {

  constructor(private socket: Socket) {
  }

  initConnection(connection: ConnectionLinux): void {
    return this.socket.emit('[new-session]', {
      type: 'linux',
      host: connection.host,
      port: connection.port,
      credential: connection.credential,
      uuid: connection.uuid
    });
  }
}
