import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UpdateHostImageAcceptanceLevel {
  _this: ManagedObjectReference;
  newAcceptanceLevel: string;
}