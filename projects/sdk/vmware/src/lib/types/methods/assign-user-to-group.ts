import {ManagedObjectReference} from '../data/managed-object-reference';


export interface AssignUserToGroup {
  _this: ManagedObjectReference;
  user: string;
  group: string;
}