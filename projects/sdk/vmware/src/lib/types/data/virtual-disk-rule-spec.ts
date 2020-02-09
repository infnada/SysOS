import {ClusterRuleInfo} from './cluster-rule-info';


export interface VirtualDiskRuleSpec extends ClusterRuleInfo {
  diskId?: number[];
  diskRuleType: string;
}