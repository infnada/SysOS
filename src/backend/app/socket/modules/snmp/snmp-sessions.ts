import snmp from 'net-snmp';

export class SnmpSessionsModule {

  snmpSessions: {smanager: []} = {
    smanager: []
  };


  constructor() {

  }

  async createSession(type: string, uuid: string, host: string, community: string): snmp {
    this.snmpSessions[type][uuid] = await snmp.createSession(host, community, {
      port: 161,
      retries: 1,
      timeout: 5000,
      transport: 'udp4',
      trapPort: 162,
      version: snmp.Version1
    });

    return this.snmpSessions[type][uuid];
  }

  closeSession(type: string, uuid: string): void {
    return this.snmpSessions[type][uuid].close();
  }

  async getAllSessions(): Promise<any> {
    return this.snmpSessions;
  }

  getSession(type: string, uuid: string): snmp {
    return this.snmpSessions[type][uuid];
  }

}
