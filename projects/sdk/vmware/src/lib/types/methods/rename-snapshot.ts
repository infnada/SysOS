import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RenameSnapshot {
  _this: ManagedObjectReference;
  name?: string;
  description?: string;
}