import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualDiskSpec} from '../data/virtual-disk-spec';


export interface CreateVirtualDisk_Task {
  _this: ManagedObjectReference;
  name: string;
  datacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
  spec: VirtualDiskSpec;
}