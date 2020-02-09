import {ClusterRuleInfo} from './cluster-rule-info';

import {ManagedObjectReference} from './managed-object-reference';

export interface ClusterAntiAffinityRuleSpec extends ClusterRuleInfo {
  vm: ManagedObjectReference & { $type: 'VirtualMachine[]'; };
}