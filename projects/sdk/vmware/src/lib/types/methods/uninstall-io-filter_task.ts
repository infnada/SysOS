import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UninstallIoFilter_Task {
  _this: ManagedObjectReference;
  filterId: string;
  compRes: ManagedObjectReference & { $type: 'ComputeResource'; };
}