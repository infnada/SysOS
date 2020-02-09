import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryIoFilterInfo {
  _this: ManagedObjectReference;
  compRes: ManagedObjectReference & { $type: 'ComputeResource'; };
}