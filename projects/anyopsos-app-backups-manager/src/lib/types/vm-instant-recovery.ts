import {
  ImConnection,
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
  virtual: ImConnection;
  vm: ImDataObject & { info: { data: VMWareVM } };
  uuid: string;
  storage: ImConnection;
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
