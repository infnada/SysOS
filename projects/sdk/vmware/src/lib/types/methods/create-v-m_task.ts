import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualMachineConfigSpec} from '../data/virtual-machine-config-spec';


export interface CreateVM_Task {
  _this: ManagedObjectReference;
  config: VirtualMachineConfigSpec;
  pool: ManagedObjectReference & { $type: 'ResourcePool'; };
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
}