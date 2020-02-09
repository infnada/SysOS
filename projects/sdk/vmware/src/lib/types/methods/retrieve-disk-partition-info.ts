import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RetrieveDiskPartitionInfo {
  _this: ManagedObjectReference;
  devicePath: string[];
}