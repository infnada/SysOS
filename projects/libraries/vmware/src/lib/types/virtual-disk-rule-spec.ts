import {ClusterRuleInfo} from './cluster-rule-info';
import {Int} from './int';

export interface VirtualDiskRuleSpec extends ClusterRuleInfo {
  diskId?: Int[];
  diskRuleType: string;
}
