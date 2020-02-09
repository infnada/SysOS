import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryVirtualDiskUuid {
  _this: ManagedObjectReference;
  name: string;
  datacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
}