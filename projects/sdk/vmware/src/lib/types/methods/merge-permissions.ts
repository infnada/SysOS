import {ManagedObjectReference} from '../data/managed-object-reference';


export interface MergePermissions {
  _this: ManagedObjectReference;
  srcRoleId: number;
  dstRoleId: number;
}