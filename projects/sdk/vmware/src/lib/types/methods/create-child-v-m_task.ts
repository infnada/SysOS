import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualMachineConfigSpec} from '../data/virtual-machine-config-spec';


export interface CreateChildVM_Task {
  _this: ManagedObjectReference;
  config: VirtualMachineConfigSpec;
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
}