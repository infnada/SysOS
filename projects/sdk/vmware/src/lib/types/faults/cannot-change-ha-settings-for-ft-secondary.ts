import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface CannotChangeHaSettingsForFtSecondary extends VmFaultToleranceIssue {
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  vmName: string;
}