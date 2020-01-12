import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';

import {LocalizedMethodFault} from './localized-method-fault';
import {ManagedObjectReference} from './managed-object-reference';
export interface FtIssuesOnHost extends VmFaultToleranceIssue {
  errors?: LocalizedMethodFault[];
  host: ManagedObjectReference & { $type: 'HostSystem' };
  hostName: string;
}
