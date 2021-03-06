import {Injectable} from '@angular/core';

import {Socket} from 'ngx-socket-io';

import {ConnectionSnmp} from '../../types/connections/connection-snmp';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureSnmpService {

  constructor(private socket: Socket) {
  }

  initConnection(connection: ConnectionSnmp): void {
    return this.socket.emit('[session-new]', {
      type: 'linux',
      host: connection.host,
      port: connection.port,
      community: connection.community,
      uuid: connection.uuid
    });
  }
}
