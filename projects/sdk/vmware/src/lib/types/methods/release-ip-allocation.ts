import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ReleaseIpAllocation {
  _this: ManagedObjectReference;
  dc: ManagedObjectReference & { $type: 'Datacenter'; };
  poolId: number;
  allocationId: string;
}