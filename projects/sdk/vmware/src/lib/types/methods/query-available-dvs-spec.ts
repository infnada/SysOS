import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryAvailableDvsSpec {
  _this: ManagedObjectReference;
  recommended?: boolean;
}