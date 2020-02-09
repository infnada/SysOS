import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualMachineRelocateSpec} from '../data/virtual-machine-relocate-spec';


export interface CheckRelocate_Task {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  spec: VirtualMachineRelocateSpec;
  testType?: string[];
}