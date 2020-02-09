import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RectifyDvsOnHost_Task {
  _this: ManagedObjectReference;
  hosts: ManagedObjectReference & { $type: 'HostSystem[]'; };
}