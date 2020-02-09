import {ManagedObjectReference} from '../data/managed-object-reference';


export interface MarkForRemoval {
  _this: ManagedObjectReference;
  hbaName: string;
  remove: boolean;
}