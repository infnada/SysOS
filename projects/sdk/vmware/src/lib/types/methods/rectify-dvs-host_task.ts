import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RectifyDvsHost_Task {
  _this: ManagedObjectReference;
  hosts?: ManagedObjectReference & { $type: 'HostSystem[]'; };
}