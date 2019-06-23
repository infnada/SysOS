import {SnmpSessionsModule} from './snmp-sessions';
import {SocketModule} from '../socket';

export class SnmpModule {

  SnmpSessionsModule: SnmpSessionsModule = new SnmpSessionsModule();
  SocketModule: SocketModule = new SocketModule(this.socket);

  constructor(private socket) {

  }

  newConnection(type: string, uuid: string, host: string, community: string) {

    this.SnmpSessionsModule.createSession(type, uuid, host, community).then(session => {
      session.on('close', (err) => {
        this.SocketModule.emitProp(type, 'CONN CLOSE', uuid, 'status');
      });
      session.on('error', (err) => {
        this.SocketModule.emitProp(type, 'CONN ERROR ' + err, uuid, 'status');
      });

      this.SocketModule.emitProp(type, 'snmp://public@' + host + ':161', uuid, 'footer');
      this.SocketModule.emitProp(type, 'SNMP CONNECTION ESTABLISHED', uuid, 'status');
      this.SocketModule.emitProp(type, 'connected', uuid, 'type');
    });

  }
}
