import {ManagedObjectReference} from '../data/managed-object-reference';


export interface DisableSecondaryVM_Task {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
}