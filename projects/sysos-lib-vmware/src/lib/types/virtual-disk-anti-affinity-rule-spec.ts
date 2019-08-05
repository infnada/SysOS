import {ClusterRuleInfo} from './cluster-rule-info';
import {Int} from './int';

export interface VirtualDiskAntiAffinityRuleSpec extends ClusterRuleInfo {
  diskId: Int[];
}
