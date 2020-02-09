import {ManagedObjectReference} from '../data/managed-object-reference';
import {ID} from '../data/i-d';


export interface AttachTagToVStorageObject {
  _this: ManagedObjectReference;
  id: ID;
  category: string;
  tag: string;
}