import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryNetworkHint {
  _this: ManagedObjectReference;
  device?: string[];
}