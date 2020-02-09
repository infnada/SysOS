import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RemoveUser {
  _this: ManagedObjectReference;
  userName: string;
}