import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualMachineInstantCloneSpec} from '../data/virtual-machine-instant-clone-spec';


export interface InstantClone_Task {
  _this: ManagedObjectReference;
  spec: VirtualMachineInstantCloneSpec;
}