import {SnmpIface} from './types/snmp-iface';
import {VarBind} from './types/var-bind';

// TODO this is a PoC
export class AnyOpsOSSnmpModule {

  constructor(private Connection: any) {

  }

  ifaces: { [id: string]: SnmpIface } = {};

  private changeInterfaceById(id: string, key: string, value: string) {
    // @ts-ignore TODO
    this.ifaces[id][key] = value;
  }

  private getIfacesNetmask(interfaceId: string, interfaceIp: string): Promise<null> {
    return new Promise((resolve, reject) => {
      if (interfaceIp === undefined) return resolve();

      this.Connection.get([`1.3.6.1.2.1.4.20.1.3.${interfaceIp}`], (e: Error, varbinds: VarBind[]) => {
        if (e) return reject(e);

        this.changeInterfaceById(interfaceId, 'netmask', varbinds[0].value);
        return resolve();
      });
    });
  }

  private getIfacesMtu(interfaceId: string): Promise<null> {
    return new Promise((resolve, reject) => {
      this.Connection.get([`1.3.6.1.2.1.2.2.1.4.${interfaceId}`], (e: Error, varbinds: VarBind[]) => {
        if (e) return reject(e);

        this.changeInterfaceById(interfaceId, 'mtu', varbinds[0].value);
        return resolve();
      });
    });
  }

  private getIfacesTrafficIn(interfaceId: string): Promise<null> {
    return new Promise((resolve, reject) => {
      this.Connection.get([`1.3.6.1.2.1.2.2.1.10.${interfaceId}`], (e: Error, varbinds: VarBind[]) => {
        if (e) return reject(e);

        this.changeInterfaceById(interfaceId, 'traffic_in', varbinds[0].value);
        return resolve();
      });
    });
  }

  private getIfacesTrafficOut(interfaceId: string): Promise<null> {
    return new Promise((resolve, reject) => {
      this.Connection.get([`1.3.6.1.2.1.2.2.1.16.${interfaceId}`], (e: Error, varbinds: VarBind[]) => {
        if (e) return reject(e);

        this.changeInterfaceById(interfaceId, 'traffic_out', varbinds[0].value);
        return resolve();
      });
    });
  }

  private getIfacesType(interfaceId: string): Promise<null> {
    return new Promise((resolve, reject) => {
      this.Connection.get([`1.3.6.1.2.1.2.2.1.3.${interfaceId}`], (e: Error, varbinds: VarBind[]) => {
        if (e) return reject(e);

        this.changeInterfaceById(interfaceId, 'type', varbinds[0].value);
        return resolve();
      });
    });
  }

  private getIfacesSpeed(interfaceId: string): Promise<null> {
    return new Promise((resolve, reject) => {
      this.Connection.get([`1.3.6.1.2.1.2.2.1.5.${interfaceId}`], (e: Error, varbinds: VarBind[]) => {
        if (e) return reject(e);

        this.changeInterfaceById(interfaceId, 'speed', varbinds[0].value);
        return resolve();
      });
    });
  }

  private getIfacesAdminStatus(interfaceId: string): Promise<null> {
    return new Promise((resolve, reject) => {
      this.Connection.get([`1.3.6.1.2.1.2.2.1.7.${interfaceId}`], (e: Error, varbinds: VarBind[]) => {
        if (e) return reject(e);

        this.changeInterfaceById(interfaceId, 'admin_status', varbinds[0].value);
        return resolve();
      });
    });
  }

  getIfaces(): Promise<null> {
    return new Promise((resolve, reject) => {

      this.Connection.subtree('1.3.6.1.2.1.2.2.1.2', (e: Error, varbinds: VarBind[]) => {

        const interfaceId: string = varbinds[0].oid.join('.').replace('1.3.6.1.2.1.2.2.1.2.', '');
        this.ifaces[interfaceId] = {
          interfaceId,
          interfaceName: varbinds[0].value.toString()
        };

      }, (e: Error) => {
        if (e) return reject(e);
      });

    });
  }

  getIfacesIp(): Promise<null> {
    return new Promise((resolve, reject) => {

      this.Connection.subtree('1.3.6.1.2.1.4.20.1.2', (e: Error, varbinds: VarBind[]) => {
        const interfaceId: string = varbinds[0].value;
        const interfaceIp: string = varbinds[0].oid.join('.').replace('1.3.6.1.2.1.4.20.1.2.', '');

        this.changeInterfaceById(interfaceId, 'ip', interfaceIp);
      }, (e: Error) => {
        if (e) return reject(e);
      });

    });
  }

  getIfacesInfo(interfaceId: string, interfaceIp: string): Promise<{ [id: string]: SnmpIface }> {

    return Promise.all([
      this.getIfacesNetmask(interfaceId, interfaceIp),
      this.getIfacesMtu(interfaceId),
      this.getIfacesTrafficIn(interfaceId),
      this.getIfacesTrafficOut(interfaceId),
      this.getIfacesType(interfaceId),
      this.getIfacesSpeed(interfaceId),
      this.getIfacesAdminStatus(interfaceId)
    ]).then(() => {
      return this.ifaces;
    });
  }
}
