import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UnmountVmfsVolume {
  _this: ManagedObjectReference;
  vmfsUuid: string;
}