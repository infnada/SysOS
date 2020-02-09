import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualMachinePowerState} from '../enums/virtual-machine-power-state';


export interface CheckMigrate_Task {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
  pool?: ManagedObjectReference & { $type: 'ResourcePool'; };
  state?: VirtualMachinePowerState;
  testType?: string[];
}