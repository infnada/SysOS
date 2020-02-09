import {ManagedObjectReference} from '../data/managed-object-reference';


export interface CheckProfileCompliance_Task {
  _this: ManagedObjectReference;
  entity?: ManagedObjectReference & { $type: 'ManagedEntity[]'; };
}