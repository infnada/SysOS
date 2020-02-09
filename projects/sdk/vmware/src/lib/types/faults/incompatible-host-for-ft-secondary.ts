import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';

import {LocalizedMethodFault} from '../data/localized-method-fault';
import {ManagedObjectReference} from '../data/managed-object-reference';

export interface IncompatibleHostForFtSecondary extends VmFaultToleranceIssue {
  error?: LocalizedMethodFault[];
  host: ManagedObjectReference & { $type: 'HostSystem'; };
}