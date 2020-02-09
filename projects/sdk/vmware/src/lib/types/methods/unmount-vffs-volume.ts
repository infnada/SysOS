import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UnmountVffsVolume {
  _this: ManagedObjectReference;
  vffsUuid: string;
}