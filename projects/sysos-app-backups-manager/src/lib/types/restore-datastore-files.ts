import {IMESXiHost, IMConnection, NetAppSnapshot, NetAppVolume, NetAppVserver, NetAppIface} from '@sysos/app-infrastructure-manager';

export interface RestoreDatastoreFiles {
  storage: IMConnection;
  vserver: NetAppVserver;
  volume: NetAppVolume;
  snapshot: NetAppSnapshot;
  uuid?: string;
  virtual?: IMESXiHost['virtual'];
  host?: IMESXiHost['host'];
  iface?: NetAppIface
  esxi_datastore_name?: string;
  volumeName?: string;
  datastorePath?: string;
}
