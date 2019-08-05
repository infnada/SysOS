import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';

import {LocalizedMethodFault} from './localized-method-fault';
import {ManagedObjectReference} from './managed-object-reference';
export interface IncompatibleHostForFtSecondary extends VmFaultToleranceIssue {
  error?: LocalizedMethodFault[];
  host: ManagedObjectReference & { $type: 'HostSystem' };
}
