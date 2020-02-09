import {DynamicData} from './dynamic-data';

import {VirtualMachineCapability} from './virtual-machine-capability';
import {DatastoreOption} from './datastore-option';
import {VirtualDevice} from './virtual-device';
import {GuestOsDescriptor} from './guest-os-descriptor';
import {VirtualHardwareOption} from './virtual-hardware-option';
import {VirtualMachinePropertyRelation} from './virtual-machine-property-relation';

export interface VirtualMachineConfigOption extends DynamicData {
  capabilities: VirtualMachineCapability;
  datastore: DatastoreOption;
  defaultDevice?: VirtualDevice[];
  description: string;
  guestOSDefaultIndex: number;
  guestOSDescriptor: GuestOsDescriptor[];
  hardwareOptions: VirtualHardwareOption;
  propertyRelations?: VirtualMachinePropertyRelation[];
  supportedMonitorType: string[];
  supportedOvfEnvironmentTransport?: string[];
  supportedOvfInstallTransport?: string[];
  version: string;
}