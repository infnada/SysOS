import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryIPAllocations {
  _this: ManagedObjectReference;
  dc: ManagedObjectReference & { $type: 'Datacenter'; };
  poolId: number;
  extensionKey: string;
}