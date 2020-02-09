import {ManagedObjectReference} from '../data/managed-object-reference';


export interface TerminateFaultTolerantVM_Task {
  _this: ManagedObjectReference;
  vm?: ManagedObjectReference & { $type: 'VirtualMachine'; };
}