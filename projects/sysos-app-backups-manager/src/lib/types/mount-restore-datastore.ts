import {IMESXiHost, IMConnection, NetAppSnapshot, NetAppVolume, NetAppVserver, NetAppIface} from '@sysos/app-infrastructure-manager';

export interface MountRestoreDatastore {
  storage: IMConnection;
  vserver: NetAppVserver;
  volume: NetAppVolume;
  snapshot: NetAppSnapshot;
  uuid?: string;
  virtual?: IMESXiHost['virtual'];
  host?: IMESXiHost['host'];
  iface?: NetAppIface
  volumeName?: string;
  datastorePath?: string;
}
