import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UpdateScsiLunDisplayName {
  _this: ManagedObjectReference;
  lunUuid: string;
  displayName: string;
}