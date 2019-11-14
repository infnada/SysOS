import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';

import {ManagedObjectReference} from './managed-object-reference';
export interface CannotComputeFTCompatibleHosts extends VmFaultToleranceIssue {
  vm: ManagedObjectReference & { $type: 'VirtualMachine' };
  vmName: string;
}
