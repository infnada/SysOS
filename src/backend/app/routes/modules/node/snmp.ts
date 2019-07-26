import snmp from 'net-snmp';

import {SnmpIface} from '../../../types/snmp-iface';

export class SnmpModule {

  constructor(private Connection: snmp) {

  }

  ifaces: SnmpIface[] = [];

  private changeInterfaceById(id: number, key: string, value: string) {
    for (const iface of this.ifaces) {
      if (iface.interfaceId === id) {
        iface[key] = value;
        break; // Stop this loop, we found it!
      }
    }
  }

  private getIfacesNetmask(interfaceId: number, interfaceIp: string): Promise<null> {
    return new Promise((resolve, reject) => {
      if (interfaceIp === undefined) return resolve();

      this.Connection.get([`1.3.6.1.2.1.4.20.1.3.${interfaceIp}`], (e, varbinds) => {
        if (e) return reject(e);

        this.changeInterfaceById(interfaceId, 'netmask', varbinds[0].value);
        return resolve();
      });
    });
  }

  private getIfacesMtu(interfaceId: number): Promise<null> {
    return new Promise((resolve, reject) => {
      this.Connection.get([`1.3.6.1.2.1.2.2.1.4.${interfaceId}`], (e, varbinds) => {
        if (e) return reject(e);

        this.changeInterfaceById(interfaceId, 'mtu', varbinds[0].value);
        return resolve();
      });
    });
  }

  private getIfacesTrafficIn(interfaceId: number): Promise<null> {
    return new Promise((resolve, reject) => {
      this.Connection.get([`1.3.6.1.2.1.2.2.1.10.${interfaceId}`], (e, varbinds) => {
        if (e) return reject(e);

        this.changeInterfaceById(interfaceId, 'traffic_in', varbinds[0].value);
        return resolve();
      });
    });
  }

  private getIfacesTrafficOut(interfaceId: number): Promise<null> {
    return new Promise((resolve, reject) => {
      this.Connection.get([`1.3.6.1.2.1.2.2.1.16.${interfaceId}`], (e, varbinds) => {
        if (e) return reject(e);

        this.changeInterfaceById(interfaceId, 'traffic_out', varbinds[0].value);
        return resolve();
      });
    });
  }

  private getIfacesType(interfaceId: number): Promise<null> {
    return new Promise((resolve, reject) => {
      this.Connection.get([`1.3.6.1.2.1.2.2.1.3.${interfaceId}`], (e, varbinds) => {
        if (e) return reject(e);

        this.changeInterfaceById(interfaceId, 'type', varbinds[0].value);
        return resolve();
      });
    });
  }

  private getIfacesSpeed(interfaceId: number): Promise<null> {
    return new Promise((resolve, reject) => {
      this.Connection.get([`1.3.6.1.2.1.2.2.1.5.${interfaceId}`], (e, varbinds) => {
        if (e) return reject(e);

        this.changeInterfaceById(interfaceId, 'speed', varbinds[0].value);
        return resolve();
      });
    });
  }

  private getIfacesAdminStatus(interfaceId: number): Promise<null> {
    return new Promise((resolve, reject) => {
      this.Connection.get([`1.3.6.1.2.1.2.2.1.7.${interfaceId}`], (e, varbinds) => {
        if (e) return reject(e);

        this.changeInterfaceById(interfaceId, 'admin_status', varbinds[0].value);
        return resolve();
      });
    });
  }

  getIfaces(): Promise<null> {
    return new Promise((resolve, reject) => {

      this.Connection.subtree('1.3.6.1.2.1.2.2.1.2', (varbinds) => {
        const interfaceId = varbinds[0].oid.replace('1.3.6.1.2.1.2.2.1.2.', '');

        const substringResult = {
          interfaceId,
          interfaceName: varbinds[0].value.toString()
        };

        this.ifaces.push(substringResult);
      }, (e) => {
        if (e) return reject(e);
      });

    });
  }

  getIfacesIp(): Promise<null> {
    return new Promise((resolve, reject) => {

      this.Connection.subtree('1.3.6.1.2.1.4.20.1.2', (varbinds) => {
        const interfaceId = varbinds[0].value;
        const interfaceIp = varbinds[0].oid.replace('1.3.6.1.2.1.4.20.1.2.', '');

        this.changeInterfaceById(interfaceId, 'ip', interfaceIp);
      }, (e) => {
        if (e) return reject(e);
      });

    });
  }

  getIfacesInfo(interfaceId: number, interfaceIp: string): Promise<Promise<null>[]> {

    return Promise.all([
      this.getIfacesNetmask(interfaceId, interfaceIp),
      this.getIfacesMtu(interfaceId),
      this.getIfacesTrafficIn(interfaceId),
      this.getIfacesTrafficOut(interfaceId),
      this.getIfacesType(interfaceId),
      this.getIfacesSpeed(interfaceId),
      this.getIfacesAdminStatus(interfaceId)
    ]);
  }
}
