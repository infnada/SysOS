import {VirtualHardwareCompatibilityIssue} from './virtual-hardware-compatibility-issue';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface CpuIncompatible extends VirtualHardwareCompatibilityIssue {
  desiredBits?: string;
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
  level: number;
  registerBits?: string;
  registerName: string;
}