import {IMESXiHost, IMConnection, NetAppSnapshot, NetAppVolume, NetAppVserver} from '@sysos/app-infrastructure-manager';

export interface MountRestoreDatastore {
  storage: IMConnection;
  vserver: NetAppVserver;
  volume: NetAppVolume;
  snapshot: NetAppSnapshot;
  uuid?: string;
  virtual?: IMESXiHost['virtual'];
  host?: IMESXiHost['host'];
  volumeName?: string;
  datastorePath?: string;
}
