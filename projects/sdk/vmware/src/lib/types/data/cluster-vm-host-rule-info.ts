import {ClusterRuleInfo} from './cluster-rule-info';


export interface ClusterVmHostRuleInfo extends ClusterRuleInfo {
  affineHostGroupName?: string;
  antiAffineHostGroupName?: string;
  vmGroupName?: string;
}