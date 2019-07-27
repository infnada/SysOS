import {ManagedObjectReference} from './managed-object-reference';
import {VirtualDeviceBackingInfo} from './virtual-device-backing-info';
import {VirtualMachineProfileSpec} from './virtual-machine-profile-spec';

export interface VirtualMachineRelocateSpecDiskLocator {
  datastore: ManagedObjectReference & { type: 'Datastore' };
  diskBackingInfo?: VirtualDeviceBackingInfo;
  diskId: number;
  diskMoveType: string;
  profile?: VirtualMachineProfileSpec[];
}
