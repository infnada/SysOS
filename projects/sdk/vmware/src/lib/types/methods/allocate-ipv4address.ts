import {ManagedObjectReference} from '../data/managed-object-reference';


export interface AllocateIpv4Address {
  _this: ManagedObjectReference;
  dc: ManagedObjectReference & { $type: 'Datacenter'; };
  poolId: number;
  allocationId: string;
}