import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ChangePassword {
  _this: ManagedObjectReference;
  user: string;
  oldPassword: string;
  newPassword: string;
}