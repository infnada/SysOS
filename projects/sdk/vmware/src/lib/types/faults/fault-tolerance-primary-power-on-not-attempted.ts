import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface FaultTolerancePrimaryPowerOnNotAttempted extends VmFaultToleranceIssue {
  primaryVm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  secondaryVm: ManagedObjectReference & { $type: 'VirtualMachine'; };
}