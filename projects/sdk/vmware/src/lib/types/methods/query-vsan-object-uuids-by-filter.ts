import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryVsanObjectUuidsByFilter {
  _this: ManagedObjectReference;
  uuids?: string[];
  limit?: number;
  version?: number;
}