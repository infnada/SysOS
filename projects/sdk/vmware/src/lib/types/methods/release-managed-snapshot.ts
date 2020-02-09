import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ReleaseManagedSnapshot {
  _this: ManagedObjectReference;
  vdisk: string;
  datacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
}