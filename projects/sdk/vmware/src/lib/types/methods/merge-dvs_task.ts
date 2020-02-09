import {ManagedObjectReference} from '../data/managed-object-reference';


export interface MergeDvs_Task {
  _this: ManagedObjectReference;
  dvs: ManagedObjectReference & { $type: 'DistributedVirtualSwitch'; };
}