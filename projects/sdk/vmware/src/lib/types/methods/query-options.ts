import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryOptions {
  _this: ManagedObjectReference;
  name?: string;
}