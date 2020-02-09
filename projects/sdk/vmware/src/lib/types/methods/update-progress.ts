import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UpdateProgress {
  _this: ManagedObjectReference;
  percentDone: number;
}