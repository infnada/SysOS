import {
  ConnectionVmware,
  ConnectionNetapp,
  ImDataObject,
  NetAppSnapshot,
  NetAppVolume,
  NetAppVserver,
  NetAppIface,
  VMWareHost,
  VMWareResourcePool,
  VMWareFolder,
  VMWareVM,
} from '@anyopsos/app-infrastructure-manager';

export interface VmInstantRecovery {
  virtual: ConnectionVmware;
  vm: ImDataObject & { info: { data: VMWareVM } };
  uuid: string;
  storage: ConnectionNetapp;
  vserver: ImDataObject & { info: { data: NetAppVserver } };
  volume: ImDataObject & { info: { data: NetAppVolume } };
  snapshot: ImDataObject & { info: { data: NetAppSnapshot } };
  host: ImDataObject & { info: { data: VMWareHost } };
  folder: ImDataObject & { info: { data: VMWareFolder } };
  resourcePool: ImDataObject & { info: { data: VMWareResourcePool } };
  iface: ImDataObject & { info: { data: NetAppIface } };
  vmName: string;
  powerOnVm: boolean;
  volumeName?: string;
  datastorePath?: string;
}
