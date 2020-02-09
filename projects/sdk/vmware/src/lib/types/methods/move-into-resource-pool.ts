import {ManagedObjectReference} from '../data/managed-object-reference';


export interface MoveIntoResourcePool {
  _this: ManagedObjectReference;
  list: ManagedObjectReference & { $type: 'ManagedEntity[]'; };
}