import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualMachineConfigSpec} from '../data/virtual-machine-config-spec';


export interface ReconfigVM_Task {
  _this: ManagedObjectReference;
  spec: VirtualMachineConfigSpec;
}