import {ClusterRuleInfo} from './cluster-rule-info';


export interface VirtualDiskAntiAffinityRuleSpec extends ClusterRuleInfo {
  diskId: number[];
}