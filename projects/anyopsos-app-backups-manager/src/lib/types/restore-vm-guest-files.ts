import {
  ConnectionVmware,
  ConnectionNetapp,
  ImDataObject,
  NetAppSnapshot,
  NetAppVolume,
  NetAppVserver,
  NetAppIface,
  VMWareVM,
  VMWareHost, VMWareFolder, VMWareResourcePool
} from '@anyopsos/app-infrastructure-manager';

export interface RestoreVmGuestFiles {
  storage: ConnectionNetapp;
  vserver: ImDataObject & { info: { data: NetAppVserver } };
  volume: ImDataObject & { info: { data: NetAppVolume } };
  snapshot: ImDataObject & { info: { data: NetAppSnapshot } };
  vm: ImDataObject & { info: { data: VMWareVM } };
  uuid: string;
  virtual: ConnectionVmware;
  host: ImDataObject & { info: { data: VMWareHost } };
  folder: ImDataObject & { info: { data: VMWareFolder } };
  resourcePool: ImDataObject & { info: { data: VMWareResourcePool } };
  iface: ImDataObject & { info: { data: NetAppIface } };
  volumeName?: string;
  datastorePath?: string;
}
