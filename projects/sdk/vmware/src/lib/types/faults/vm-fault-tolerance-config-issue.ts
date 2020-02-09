import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface VmFaultToleranceConfigIssue extends VmFaultToleranceIssue {
  entity?: ManagedObjectReference & { $type: 'ManagedEntity'; };
  entityName?: string;
  reason?: string;
}