import {ManagedObjectReference} from '../data/managed-object-reference';


export interface EnableSecondaryVM_Task {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
}