import {ManagedObjectReference} from '../data/managed-object-reference';


export interface DeleteScsiLunState {
  _this: ManagedObjectReference;
  lunCanonicalName: string;
}