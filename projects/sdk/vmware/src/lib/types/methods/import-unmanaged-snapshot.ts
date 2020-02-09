import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ImportUnmanagedSnapshot {
  _this: ManagedObjectReference;
  vdisk: string;
  datacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
  vvolId: string;
}