import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualMachineMovePriority} from '../enums/virtual-machine-move-priority';
import {VirtualMachinePowerState} from '../enums/virtual-machine-power-state';


export interface MigrateVM_Task {
  _this: ManagedObjectReference;
  pool?: ManagedObjectReference & { $type: 'ResourcePool'; };
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
  priority: VirtualMachineMovePriority;
  state?: VirtualMachinePowerState;
}