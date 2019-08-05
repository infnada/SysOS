import {DynamicData} from './dynamic-data';

import {ClusterDasConfigInfo} from './cluster-das-config-info';
import {ClusterDasVmConfigInfo} from './cluster-das-vm-config-info';
import {ClusterDrsConfigInfo} from './cluster-drs-config-info';
import {ClusterDrsVmConfigInfo} from './cluster-drs-vm-config-info';
import {ClusterRuleInfo} from './cluster-rule-info';
export interface ClusterConfigInfo extends DynamicData {
  dasConfig: ClusterDasConfigInfo;
  dasVmConfig?: ClusterDasVmConfigInfo[];
  drsConfig: ClusterDrsConfigInfo;
  drsVmConfig?: ClusterDrsVmConfigInfo[];
  rule?: ClusterRuleInfo[];
}
