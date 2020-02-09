import {ManagedObjectReference} from '../data/managed-object-reference';


export interface HasProvider {
  _this: ManagedObjectReference;
  id: string;
}