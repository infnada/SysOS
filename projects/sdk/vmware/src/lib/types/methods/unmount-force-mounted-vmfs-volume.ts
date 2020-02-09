import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UnmountForceMountedVmfsVolume {
  _this: ManagedObjectReference;
  vmfsUuid: string;
}