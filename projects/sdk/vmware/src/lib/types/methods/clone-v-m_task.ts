import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualMachineCloneSpec} from '../data/virtual-machine-clone-spec';


export interface CloneVM_Task {
  _this: ManagedObjectReference;
  folder: ManagedObjectReference & { $type: 'Folder'; };
  name: string;
  spec: VirtualMachineCloneSpec;
}