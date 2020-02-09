import {ManagedObjectReference} from '../data/managed-object-reference';


export interface MarkAsVirtualMachine {
  _this: ManagedObjectReference;
  pool: ManagedObjectReference & { $type: 'ResourcePool'; };
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
}