import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualMachineDisplayTopology} from '../data/virtual-machine-display-topology';


export interface SetDisplayTopology {
  _this: ManagedObjectReference;
  displays: VirtualMachineDisplayTopology[];
}