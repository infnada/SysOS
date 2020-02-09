import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryPartitionCreateDesc {
  _this: ManagedObjectReference;
  diskUuid: string;
  diagnosticType: string;
}