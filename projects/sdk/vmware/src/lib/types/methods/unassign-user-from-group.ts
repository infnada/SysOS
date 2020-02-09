import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UnassignUserFromGroup {
  _this: ManagedObjectReference;
  user: string;
  group: string;
}