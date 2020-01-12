import {ClusterRuleInfo} from './cluster-rule-info';

import {ManagedObjectReference} from './managed-object-reference';
export interface ClusterAffinityRuleSpec extends ClusterRuleInfo {
  vm: ManagedObjectReference[] & { $type: 'VirtualMachine' };
}
