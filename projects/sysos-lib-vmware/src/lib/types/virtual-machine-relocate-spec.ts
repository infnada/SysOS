import {ManagedObjectReference} from './managed-object-reference';
import {VirtualDeviceConfigSpec} from './virtual-device-config-spec';
import {VirtualMachineRelocateSpecDiskLocator} from './virtual-machine-relocate-spec-disk-locator';
import {VirtualMachineProfileSpec} from './virtual-machine-profile-spec';
import {ServiceLocator} from './service-locator';
import {VirtualMachineRelocateTransformation} from './virtual-machine-relocate-transformation';

export interface VirtualMachineRelocateSpec {
  datastore?: ManagedObjectReference & { type: 'Datastore' };
  deviceChange?: VirtualDeviceConfigSpec[];
  disk?: VirtualMachineRelocateSpecDiskLocator[];
  diskMoveType?: string;
  folder?: ManagedObjectReference & { type: 'Folder' };
  host?: ManagedObjectReference & { type: 'HostSystem' };
  pool?: ManagedObjectReference & { type: 'ResourcePool' };
  profile?: VirtualMachineProfileSpec[];
  service?: ServiceLocator;
  transform?: VirtualMachineRelocateTransformation;
}
