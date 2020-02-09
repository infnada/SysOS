import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RetrieveArgumentDescription {
  _this: ManagedObjectReference;
  eventTypeId: string;
}