import {ManagedObjectReference} from '../data/managed-object-reference';


export interface CloneSession {
  _this: ManagedObjectReference;
  cloneTicket: string;
}