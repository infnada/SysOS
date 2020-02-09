import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryObjectsOnPhysicalVsanDisk {
  _this: ManagedObjectReference;
  disks: string[];
}