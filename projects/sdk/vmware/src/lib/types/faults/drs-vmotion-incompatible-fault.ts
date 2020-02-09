import {VirtualHardwareCompatibilityIssue} from './virtual-hardware-compatibility-issue';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface DrsVmotionIncompatibleFault extends VirtualHardwareCompatibilityIssue {
  host: ManagedObjectReference & { $type: 'HostSystem'; };
}