import {Injectable} from '@angular/core';

import {Socket} from 'ngx-socket-io';

import {ConnectionDocker} from '../../types/connections/connection-docker';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureDockerService {

  constructor(private socket: Socket) {
  }

  initConnection(connection: ConnectionDocker): void {
    return this.socket.emit('[session-new]', {
      type: 'docker',
      clusterName: connection.clusterName,
      clusterServer: connection.clusterServer,
      clusterCa: connection.clusterCa,
      credential: connection.credential,
      uuid: connection.uuid
    });
  }
}
