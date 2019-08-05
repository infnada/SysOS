import {ClusterRuleInfo} from './cluster-rule-info';

export interface ClusterDependencyRuleInfo extends ClusterRuleInfo {
  dependsOnVmGroup: string;
  vmGroup: string;
}
