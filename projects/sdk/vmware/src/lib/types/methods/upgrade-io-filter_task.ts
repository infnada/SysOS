import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UpgradeIoFilter_Task {
  _this: ManagedObjectReference;
  filterId: string;
  compRes: ManagedObjectReference & { $type: 'ComputeResource'; };
  vibUrl: string;
}