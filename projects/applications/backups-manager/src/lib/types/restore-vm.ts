import {ConnectionVmware, VMWareFolder, VMWareHost, VMWareResourcePool, VMWareVM} from '@anyopsos/module-node-vmware';
import {ConnectionNetapp, NetAppSnapshot, NetAppVolume, NetAppVserver} from '@anyopsos/module-node-netapp';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

export interface RestoreVm {
  virtual: ConnectionVmware;
  vm: DataObject & { info: { data: VMWareVM } };
  uuid: string;
  storage: ConnectionNetapp;
  vserver: DataObject & { info: { data: NetAppVserver } };
  volume: DataObject & { info: { data: NetAppVolume } };
  snapshot: DataObject & { info: { data: NetAppSnapshot } };
  host: DataObject & { info: { data: VMWareHost } };
  folder: DataObject & { info: { data: VMWareFolder } };
  resourcePool: DataObject & { info: { data: VMWareResourcePool } };
  powerOnVm: boolean;
}
