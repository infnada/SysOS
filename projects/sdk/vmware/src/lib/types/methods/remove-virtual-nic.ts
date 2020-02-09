import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RemoveVirtualNic {
  _this: ManagedObjectReference;
  device: string;
}