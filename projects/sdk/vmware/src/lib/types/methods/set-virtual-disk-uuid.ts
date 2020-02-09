import {ManagedObjectReference} from '../data/managed-object-reference';


export interface SetVirtualDiskUuid {
  _this: ManagedObjectReference;
  name: string;
  datacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
  uuid: string;
}