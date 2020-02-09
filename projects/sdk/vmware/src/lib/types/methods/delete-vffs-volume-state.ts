import {ManagedObjectReference} from '../data/managed-object-reference';


export interface DeleteVffsVolumeState {
  _this: ManagedObjectReference;
  vffsUuid: string;
}