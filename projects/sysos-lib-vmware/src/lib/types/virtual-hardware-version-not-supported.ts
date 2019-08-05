import {VirtualHardwareCompatibilityIssue} from './virtual-hardware-compatibility-issue';

import {ManagedObjectReference} from './managed-object-reference';
export interface VirtualHardwareVersionNotSupported extends VirtualHardwareCompatibilityIssue {
  host: ManagedObjectReference & { $type: 'HostSystem' };
  hostName: string;
}
