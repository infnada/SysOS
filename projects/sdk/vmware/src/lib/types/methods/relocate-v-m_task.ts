import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualMachineRelocateSpec} from '../data/virtual-machine-relocate-spec';
import {VirtualMachineMovePriority} from '../enums/virtual-machine-move-priority';


export interface RelocateVM_Task {
  _this: ManagedObjectReference;
  spec: VirtualMachineRelocateSpec;
  priority?: VirtualMachineMovePriority;
}