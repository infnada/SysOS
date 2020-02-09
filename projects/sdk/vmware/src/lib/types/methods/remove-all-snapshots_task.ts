import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RemoveAllSnapshots_Task {
  _this: ManagedObjectReference;
  consolidate?: boolean;
}