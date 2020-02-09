import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryVirtualDiskFragmentation {
  _this: ManagedObjectReference;
  name: string;
  datacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
}