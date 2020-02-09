import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UpdateVmfsUnmapPriority {
  _this: ManagedObjectReference;
  vmfsUuid: string;
  unmapPriority: string;
}