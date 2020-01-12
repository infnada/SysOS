import {
  ConnectionVmware,
  ConnectionNetapp,
  ImDataObject,
  NetAppSnapshot,
  NetAppVolume,
  NetAppVserver,
  NetAppIface,
  VMWareHost
} from '@anyopsos/app-infrastructure-manager';

export interface RestoreVolumeFiles {
  storage: ConnectionNetapp;
  vserver: ImDataObject & { info: { data: NetAppVserver } };
  volume: ImDataObject & { info: { data: NetAppVolume } };
  snapshot: ImDataObject & { info: { data: NetAppSnapshot } };
  uuid: string;
  virtual: ConnectionVmware;
  host: ImDataObject & { info: { data: VMWareHost } };
  iface: ImDataObject & { info: { data: NetAppIface } };
  esxiDatastoreName: string;
  volumeName?: string;
  datastorePath?: string;
}
