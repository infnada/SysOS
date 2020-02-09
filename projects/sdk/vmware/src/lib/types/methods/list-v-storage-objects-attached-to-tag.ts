import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ListVStorageObjectsAttachedToTag {
  _this: ManagedObjectReference;
  category: string;
  tag: string;
}