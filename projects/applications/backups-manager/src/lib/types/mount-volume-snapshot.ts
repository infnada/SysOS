import {ConnectionNetapp, NetAppIface, NetAppSnapshot, NetAppVolume, NetAppVserver} from '@anyopsos/module-node-netapp';
import {ConnectionVmware, VMWareHost} from '@anyopsos/module-node-vmware';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

export interface MountVolumeSnapshot {
  storage: ConnectionNetapp;
  vserver: DataObject & { info: { data: NetAppVserver } };
  volume: DataObject & { info: { data: NetAppVolume } };
  snapshot: DataObject & { info: { data: NetAppSnapshot } };
  uuid: string;
  virtual: ConnectionVmware;
  host: DataObject & { info: { data: VMWareHost } };
  iface: DataObject & { info: { data: NetAppIface } };
  volumeName?: string;
  datastorePath?: string;
}
