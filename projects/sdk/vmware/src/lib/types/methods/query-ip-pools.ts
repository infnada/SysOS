import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryIpPools {
  _this: ManagedObjectReference;
  dc: ManagedObjectReference & { $type: 'Datacenter'; };
}