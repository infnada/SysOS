import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualMachineInstantCloneSpec} from '../data/virtual-machine-instant-clone-spec';


export interface CheckInstantClone_Task {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  spec: VirtualMachineInstantCloneSpec;
  testType?: string[];
}