import {ManagedObjectReference} from '../data/managed-object-reference';


export interface DeleteVmfsVolumeState {
  _this: ManagedObjectReference;
  vmfsUuid: string;
}