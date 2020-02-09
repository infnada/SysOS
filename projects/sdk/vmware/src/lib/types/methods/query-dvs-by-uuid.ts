import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryDvsByUuid {
  _this: ManagedObjectReference;
  uuid: string;
}