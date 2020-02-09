import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ResetCounterLevelMapping {
  _this: ManagedObjectReference;
  counters: number[];
}