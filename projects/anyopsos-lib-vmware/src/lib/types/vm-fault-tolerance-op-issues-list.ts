import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';

import {LocalizedMethodFault} from './localized-method-fault';
export interface VmFaultToleranceOpIssuesList extends VmFaultToleranceIssue {
  errors?: LocalizedMethodFault[];
  warnings?: LocalizedMethodFault[];
}
