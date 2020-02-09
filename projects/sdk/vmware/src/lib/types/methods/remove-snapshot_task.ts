import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RemoveSnapshot_Task {
  _this: ManagedObjectReference;
  removeChildren: boolean;
  consolidate?: boolean;
}