import {ManagedObjectReference} from '../data/managed-object-reference';


export interface SetNFSUser {
  _this: ManagedObjectReference;
  user: string;
  password: string;
}