import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ZeroFillVirtualDisk_Task {
  _this: ManagedObjectReference;
  name: string;
  datacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
}