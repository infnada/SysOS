import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface NotSupportedDeviceForFT extends VmFaultToleranceIssue {
  deviceLabel?: string;
  deviceType: string;
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  hostName?: string;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  vmName?: string;
}