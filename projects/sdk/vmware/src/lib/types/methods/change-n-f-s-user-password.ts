import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ChangeNFSUserPassword {
  _this: ManagedObjectReference;
  password: string;
}