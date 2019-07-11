import {IMESXiHost, IMConnection, NetAppSnapshot, NetAppVolume, NetAppVserver, VMWareObject, VMWareVM} from '@sysos/app-infrastructure-manager';

export interface RestoreVmGuestFiles {
  storage: IMConnection;
  vserver: NetAppVserver;
  volume: NetAppVolume;
  snapshot: NetAppSnapshot;
  vm: VMWareObject & { data: VMWareVM };
  uuid?: string;
  virtual?: IMESXiHost['virtual'];
  host?: IMESXiHost['host'] & {
    folder: string;
    resource_pool: string;
  };
  volumeName?: string;
  datastorePath?: string;
}
