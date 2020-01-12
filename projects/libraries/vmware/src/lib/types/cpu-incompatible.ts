import {VirtualHardwareCompatibilityIssue} from './virtual-hardware-compatibility-issue';

import {ManagedObjectReference} from './managed-object-reference';
import {Int} from './int';
export interface CpuIncompatible extends VirtualHardwareCompatibilityIssue {
  desiredBits?: string;
  host?: ManagedObjectReference & { $type: 'HostSystem' };
  level: Int;
  registerBits?: string;
  registerName: string;
}
