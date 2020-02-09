import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RemovePerfInterval {
  _this: ManagedObjectReference;
  samplePeriod: number;
}