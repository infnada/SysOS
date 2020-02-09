import {ManagedObjectReference} from '../data/managed-object-reference';


export interface AttachScsiLun {
  _this: ManagedObjectReference;
  lunUuid: string;
}