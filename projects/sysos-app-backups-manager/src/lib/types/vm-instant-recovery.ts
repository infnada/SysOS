import {IMESXiHost, IMConnection, NetAppSnapshot, NetAppVolume, NetAppVserver, NetAppIface, VMWareObject, VMWareVM} from '@sysos/app-infrastructure-manager';

export interface VmInstantRecovery {
  virtual: IMConnection;
  vm: VMWareObject & { info: { data: VMWareVM } } & {
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
  iface?: NetAppIface;
  volumeName?: string;
  datastorePath?: string;
}
