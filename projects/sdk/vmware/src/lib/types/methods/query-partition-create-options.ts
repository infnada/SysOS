import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryPartitionCreateOptions {
  _this: ManagedObjectReference;
  storageType: string;
  diagnosticType: string;
}