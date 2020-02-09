import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UpdateLockdownExceptions {
  _this: ManagedObjectReference;
  users?: string[];
}