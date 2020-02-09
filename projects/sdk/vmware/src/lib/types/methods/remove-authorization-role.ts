import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RemoveAuthorizationRole {
  _this: ManagedObjectReference;
  roleId: number;
  failIfUsed: boolean;
}