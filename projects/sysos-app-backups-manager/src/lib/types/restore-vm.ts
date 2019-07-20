import {IMESXiHost, IMConnection, NetAppSnapshot, NetAppVolume, NetAppVserver, VMWareObject, VMWareVM} from '@sysos/app-infrastructure-manager';

export interface RestoreVm {
  virtual: IMConnection;
  vm: VMWareObject & { data: VMWareVM } & {
    powerOn?: boolean;
  };
  uuid?: string;
  storage?: IMConnection;
  vserver?: NetAppVserver;
  volume?: NetAppVolume;
  snapshot?: NetAppSnapshot;
  host?: IMESXiHost['host'] & {
    folder: string;
    resource_pool: string;
  };
}
