import {VmConfigFault} from './vm-config-fault';

import {ManagedObjectReference} from './managed-object-reference';
import {ClusterRuleInfo} from './cluster-rule-info';
export interface RuleViolation extends VmConfigFault {
  host?: ManagedObjectReference & { $type: 'HostSystem' };
  rule: ClusterRuleInfo;
}
