import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualMachinePowerState} from '../enums/virtual-machine-power-state';


export interface ValidateMigration {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine[]'; };
  state?: VirtualMachinePowerState;
  testType?: string[];
  pool?: ManagedObjectReference & { $type: 'ResourcePool'; };
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
}