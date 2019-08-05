import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';

import {ManagedObjectReference} from './managed-object-reference';
import {ManagedObjectReference} from './managed-object-reference';
export interface NotSupportedDeviceForFT extends VmFaultToleranceIssue {
  deviceLabel?: ManagedObjectReference & { $type: 'HostSystem' };
  hostName?: ManagedObjectReference & { $type: 'VirtualMachine' };
  vmName?: string;
}
