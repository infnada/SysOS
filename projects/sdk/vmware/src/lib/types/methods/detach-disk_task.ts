import {ManagedObjectReference} from '../data/managed-object-reference';
import {ID} from '../data/i-d';


export interface DetachDisk_Task {
  _this: ManagedObjectReference;
  diskId: ID;
}