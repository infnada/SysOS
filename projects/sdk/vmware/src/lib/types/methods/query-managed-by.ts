import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryManagedBy {
  _this: ManagedObjectReference;
  extensionKey: string;
}