import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UpdateSystemUsers {
  _this: ManagedObjectReference;
  users?: string[];
}