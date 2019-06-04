import snmp from 'net-snmp';

export class SnmpSessionsModule {

  snmpSessions: {smanager: []} = {
    smanager: []
  };


  constructor() {

  }

  async createSession(type, uuid, host, community) {
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

  closeSession(type, uuid) {
    return this.snmpSessions[type][uuid].close();
  }

  async getAllSessions() {
    return this.snmpSessions;
  }

  getSession(type, uuid) {
    return this.snmpSessions[type][uuid];
  }

}
