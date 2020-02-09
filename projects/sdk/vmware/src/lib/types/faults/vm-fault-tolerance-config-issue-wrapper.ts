import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';

import {ManagedObjectReference} from '../data/managed-object-reference';
import {LocalizedMethodFault} from '../data/localized-method-fault';

export interface VmFaultToleranceConfigIssueWrapper extends VmFaultToleranceIssue {
  entity?: ManagedObjectReference & { $type: 'ManagedEntity'; };
  entityName?: string;
  error?: LocalizedMethodFault;
}