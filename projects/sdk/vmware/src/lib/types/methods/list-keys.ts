import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ListKeys {
  _this: ManagedObjectReference;
  limit?: number;
}