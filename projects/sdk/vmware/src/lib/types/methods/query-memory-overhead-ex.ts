import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualMachineConfigInfo} from '../data/virtual-machine-config-info';


export interface QueryMemoryOverheadEx {
  _this: ManagedObjectReference;
  vmConfigInfo: VirtualMachineConfigInfo;
}