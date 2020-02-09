import {ManagedObjectReference} from '../data/managed-object-reference';


export interface InstallIoFilter_Task {
  _this: ManagedObjectReference;
  vibUrl: string;
  compRes: ManagedObjectReference & { $type: 'ComputeResource'; };
}