import {ManagedObjectReference} from '../data/managed-object-reference';


export interface DestroyIpPool {
  _this: ManagedObjectReference;
  dc: ManagedObjectReference & { $type: 'Datacenter'; };
  id: number;
  force: boolean;
}