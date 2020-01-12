import {Socket} from 'socket.io';

import {AnyOpsOSSocketModule} from '@anyopsos/module-socket';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

import {SnmpSessionsModule} from './snmp-sessions';
import {ConnectionSnmp} from './types/connection-snmp';

// TODO this is a PoC
export class AnyOpsOSSnmpSocketModule {

  private readonly SnmpSessionsModule: SnmpSessionsModule = new SnmpSessionsModule();
  private readonly SocketModule: AnyOpsOSSocketModule = new AnyOpsOSSocketModule(this.socket);

  constructor(private readonly socket: Socket) {
  }

  async newConnection(userUuid: string, sessionUuid: string, data: ConnectionSnmp): Promise<BackendResponse> {

    const snmpSession: any = await this.SnmpSessionsModule.createSession(userUuid, sessionUuid, data.uuid, data.type, data.host, data.community);

    snmpSession.on('close', (e: Error) => {
      this.SocketModule.emitProp(data.type, 'CONN CLOSE', data.uuid, 'status');
    });
    snmpSession.on('error', (e: Error) => {
      this.SocketModule.emitProp(data.type, 'CONN ERROR ' + e, data.uuid, 'status');
    });

    this.SocketModule.emitProp(data.type, 'snmp://public@' + data.host + ':161', data.uuid, 'footer');
    this.SocketModule.emitProp(data.type, 'SNMP CONNECTION ESTABLISHED', data.uuid, 'status');
    this.SocketModule.emitProp(data.type, 'connected', data.uuid, 'state');

    return {status: 'ok', data: 'connected'};

  }

}
