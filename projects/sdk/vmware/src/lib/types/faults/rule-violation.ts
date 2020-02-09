import {VmConfigFault} from './vm-config-fault';

import {ManagedObjectReference} from '../data/managed-object-reference';
import {ClusterRuleInfo} from '../data/cluster-rule-info';

export interface RuleViolation extends VmConfigFault {
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
  rule: ClusterRuleInfo;
}