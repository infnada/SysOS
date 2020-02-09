import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryDvsConfigTarget {
  _this: ManagedObjectReference;
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
  dvs?: ManagedObjectReference & { $type: 'DistributedVirtualSwitch'; };
}