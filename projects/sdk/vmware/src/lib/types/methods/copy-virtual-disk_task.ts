import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualDiskSpec} from '../data/virtual-disk-spec';


export interface CopyVirtualDisk_Task {
  _this: ManagedObjectReference;
  sourceName: string;
  sourceDatacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
  destName: string;
  destDatacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
  destSpec?: VirtualDiskSpec;
  force?: boolean;
}