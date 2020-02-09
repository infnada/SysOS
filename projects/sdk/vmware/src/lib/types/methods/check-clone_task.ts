import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualMachineCloneSpec} from '../data/virtual-machine-clone-spec';


export interface CheckClone_Task {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  folder: ManagedObjectReference & { $type: 'Folder'; };
  name: string;
  spec: VirtualMachineCloneSpec;
  testType?: string[];
}