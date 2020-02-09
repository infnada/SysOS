import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryVmfsDatastoreCreateOptions {
  _this: ManagedObjectReference;
  devicePath: string;
  vmfsMajorVersion?: number;
}