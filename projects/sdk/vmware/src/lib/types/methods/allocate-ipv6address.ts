import {ManagedObjectReference} from '../data/managed-object-reference';


export interface AllocateIpv6Address {
  _this: ManagedObjectReference;
  dc: ManagedObjectReference & { $type: 'Datacenter'; };
  poolId: number;
  allocationId: string;
}