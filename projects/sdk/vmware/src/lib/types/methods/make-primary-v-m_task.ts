import {ManagedObjectReference} from '../data/managed-object-reference';


export interface MakePrimaryVM_Task {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
}