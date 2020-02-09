import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryPerfCounter {
  _this: ManagedObjectReference;
  counterId: number[];
}