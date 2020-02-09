import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UnregisterHealthUpdateProvider {
  _this: ManagedObjectReference;
  providerId: string;
}