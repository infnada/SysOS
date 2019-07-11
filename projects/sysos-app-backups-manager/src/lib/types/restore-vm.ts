import {IMESXiHost, IMConnection, NetAppSnapshot, NetAppVolume, NetAppVserver, VMWareObject, VMWareVM} from '@sysos/app-infrastructure-manager';

export interface RestoreVm {
  virtual: IMESXiHost['virtual'];
  storage: IMConnection;
  vserver: NetAppVserver;
  volume: NetAppVolume;
  snapshot: NetAppSnapshot;
  vm: VMWareObject & { data: VMWareVM } & {
    powerOn?: boolean;
  };
  uuid?: string;
  host?: IMESXiHost['host'];
}
