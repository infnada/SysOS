import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryServiceList {
  _this: ManagedObjectReference;
  serviceName?: string;
  location?: string[];
}