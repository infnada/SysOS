import {ManagedObjectReference} from '../data/managed-object-reference';


export interface DetachScsiLun {
  _this: ManagedObjectReference;
  lunUuid: string;
}