import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryHostsWithAttachedLun {
  _this: ManagedObjectReference;
  lunUuid: string;
}