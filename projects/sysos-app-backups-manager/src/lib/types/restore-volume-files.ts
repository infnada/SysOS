import {
  ImConnection,
  ImDataObject,
  NetAppSnapshot,
  NetAppVolume,
  NetAppVserver,
  NetAppIface,
  VMWareHost
} from '@sysos/app-infrastructure-manager';

export interface RestoreVolumeFiles {
  storage: ImConnection;
  vserver: ImDataObject & { info: { data: NetAppVserver } };
  volume: ImDataObject & { info: { data: NetAppVolume } };
  snapshot: ImDataObject & { info: { data: NetAppSnapshot } };
  uuid: string;
  virtual: ImConnection;
  host: ImDataObject & { info: { data: VMWareHost } };
  iface: ImDataObject & { info: { data: NetAppIface } };
  esxiDatastoreName: string;
  volumeName?: string;
  datastorePath?: string;
}
