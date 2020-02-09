import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualMachineConfigSpec} from '../data/virtual-machine-config-spec';


export interface CheckVmConfig_Task {
  _this: ManagedObjectReference;
  spec: VirtualMachineConfigSpec;
  vm?: ManagedObjectReference & { $type: 'VirtualMachine'; };
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
  pool?: ManagedObjectReference & { $type: 'ResourcePool'; };
  testType?: string[];
}