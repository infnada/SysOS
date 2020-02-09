import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ConfigureDatastorePrincipal {
  _this: ManagedObjectReference;
  userName: string;
  password?: string;
}