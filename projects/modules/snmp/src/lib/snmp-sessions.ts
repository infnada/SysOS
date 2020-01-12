// TODO
const snmp = require('snmp-native');

import {UserToSessionToSnmpMap} from './types/user-to-session-to-snmp-map';

// TODO this is a PoC
export class SnmpSessionsModule {

  private snmpSessions: UserToSessionToSnmpMap = {};

  constructor() {

  }

  async createSession(userUuid: string, sessionUuid: string, connectionUuid: string, type: string, host: string, community: string): Promise<any> {
    this.snmpSessions[userUuid][sessionUuid][connectionUuid] = await snmp.createSession(userUuid, sessionUuid, host, community, {
      port: 161,
      retries: 1,
      timeout: 5000,
      transport: 'udp4',
      trapPort: 162,
      version: snmp.Version1
    });

    return this.snmpSessions[userUuid][sessionUuid][connectionUuid];
  }

  closeSession(userUuid: string, sessionUuid: string, connectionUuid: string): void {
    // TODO close?
    // @ts-ignore
    return this.snmpSessions[userUuid][sessionUuid][connectionUuid].close();
  }

  getSession(userUuid: string, sessionUuid: string, connectionUuid: string): any {
    return this.snmpSessions[userUuid][sessionUuid][connectionUuid];
  }

}
