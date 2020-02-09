import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ReadPreviousEvents {
  _this: ManagedObjectReference;
  maxCount: number;
}