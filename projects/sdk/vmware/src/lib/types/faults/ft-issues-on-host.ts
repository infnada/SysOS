import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';

import {LocalizedMethodFault} from '../data/localized-method-fault';
import {ManagedObjectReference} from '../data/managed-object-reference';

export interface FtIssuesOnHost extends VmFaultToleranceIssue {
  errors?: LocalizedMethodFault[];
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  hostName: string;
}