import {ManagedObjectReference} from '../data/managed-object-reference';


export interface MountVmfsVolume {
  _this: ManagedObjectReference;
  vmfsUuid: string;
}