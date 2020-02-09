import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualMachineProfileSpec} from '../data/virtual-machine-profile-spec';


export interface MoveVirtualDisk_Task {
  _this: ManagedObjectReference;
  sourceName: string;
  sourceDatacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
  destName: string;
  destDatacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
  force?: boolean;
  profile?: VirtualMachineProfileSpec[];
}