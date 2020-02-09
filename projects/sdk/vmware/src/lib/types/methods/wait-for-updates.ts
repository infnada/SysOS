import {ManagedObjectReference} from '../data/managed-object-reference';


export interface WaitForUpdates {
  _this: ManagedObjectReference;
  version?: string;
}