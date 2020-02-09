import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ReadNextEvents {
  _this: ManagedObjectReference;
  maxCount: number;
}