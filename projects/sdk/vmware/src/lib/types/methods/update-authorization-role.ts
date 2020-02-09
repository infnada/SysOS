import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UpdateAuthorizationRole {
  _this: ManagedObjectReference;
  roleId: number;
  newName: string;
  privIds?: string[];
}