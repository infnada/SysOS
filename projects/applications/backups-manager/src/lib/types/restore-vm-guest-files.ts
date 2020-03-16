import {ConnectionNetapp, NetAppIface, NetAppSnapshot, NetAppVolume, NetAppVserver} from '@anyopsos/module-node-netapp';
import {ConnectionVmware, VMWareFolder, VMWareHost, VMWareResourcePool, VMWareVM} from '@anyopsos/module-node-vmware';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

export interface RestoreVmGuestFiles {
  storage: ConnectionNetapp;
  vserver: DataObject & { info: { data: NetAppVserver } };
  volume: DataObject & { info: { data: NetAppVolume } };
  snapshot: DataObject & { info: { data: NetAppSnapshot } };
  vm: DataObject & { info: { data: VMWareVM } };
  uuid: string;
  virtual: ConnectionVmware;
  host: DataObject & { info: { data: VMWareHost } };
  folder: DataObject & { info: { data: VMWareFolder } };
  resourcePool: DataObject & { info: { data: VMWareResourcePool } };
  iface: DataObject & { info: { data: NetAppIface } };
  volumeName?: string;
  datastorePath?: string;
}
