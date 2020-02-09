import {ManagedObjectReference} from '../data/managed-object-reference';


export interface HostRegisterDisk {
  _this: ManagedObjectReference;
  path: string;
  name?: string;
}