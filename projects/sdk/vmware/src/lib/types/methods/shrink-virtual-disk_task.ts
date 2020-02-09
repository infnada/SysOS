import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ShrinkVirtualDisk_Task {
  _this: ManagedObjectReference;
  name: string;
  datacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
  copy?: boolean;
}