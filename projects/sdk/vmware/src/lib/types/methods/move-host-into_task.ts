import {ManagedObjectReference} from '../data/managed-object-reference';


export interface MoveHostInto_Task {
  _this: ManagedObjectReference;
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  resourcePool?: ManagedObjectReference & { $type: 'ResourcePool'; };
}