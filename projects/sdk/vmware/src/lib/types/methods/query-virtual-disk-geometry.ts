import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryVirtualDiskGeometry {
  _this: ManagedObjectReference;
  name: string;
  datacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
}