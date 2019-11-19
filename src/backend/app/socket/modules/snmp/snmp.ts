import {SnmpSessionsModule} from './snmp-sessions';
import {SocketModule} from '../socket';

import {ConnectionSnmp} from '../../../interfaces/socket-connections/connection-snmp';

export class SnmpSocketModule {

  private SnmpSessionsModule: SnmpSessionsModule = new SnmpSessionsModule();
  private SocketModule: SocketModule = new SocketModule(this.socket);

  constructor(private socket) {

  }

  newConnection(data: ConnectionSnmp) {

    this.SnmpSessionsModule.createSession(data.type, data.uuid, data.host, data.community).then(session => {
      session.on('close', (err) => {
        this.SocketModule.emitProp(data.type, 'CONN CLOSE', data.uuid, 'status');
      });
      session.on('error', (err) => {
        this.SocketModule.emitProp(data.type, 'CONN ERROR ' + err, data.uuid, 'status');
      });

      this.SocketModule.emitProp(data.type, 'snmp://public@' + data.host + ':161', data.uuid, 'footer');
      this.SocketModule.emitProp(data.type, 'SNMP CONNECTION ESTABLISHED', data.uuid, 'status');
      this.SocketModule.emitProp(data.type, 'connected', data.uuid, 'state');
    });

  }
}
