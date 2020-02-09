import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RegisterDisk {
  _this: ManagedObjectReference;
  path: string;
  name?: string;
}