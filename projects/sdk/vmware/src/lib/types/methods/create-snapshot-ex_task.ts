import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualMachineGuestQuiesceSpec} from '../data/virtual-machine-guest-quiesce-spec';


export interface CreateSnapshotEx_Task {
  _this: ManagedObjectReference;
  name: string;
  description?: string;
  memory: boolean;
  quiesceSpec?: VirtualMachineGuestQuiesceSpec;
}