import {ManagedObjectReference} from '../data/managed-object-reference';


export interface MoveIntoFolder_Task {
  _this: ManagedObjectReference;
  list: ManagedObjectReference & { $type: 'ManagedEntity[]'; };
}