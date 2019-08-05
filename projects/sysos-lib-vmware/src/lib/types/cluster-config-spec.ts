import {DynamicData} from './dynamic-data';

import {ClusterDasConfigInfo} from './cluster-das-config-info';
import {ClusterDasVmConfigSpec} from './cluster-das-vm-config-spec';
import {ClusterDrsConfigInfo} from './cluster-drs-config-info';
import {ClusterDrsVmConfigSpec} from './cluster-drs-vm-config-spec';
import {ClusterRuleSpec} from './cluster-rule-spec';
export interface ClusterConfigSpec extends DynamicData {
  dasConfig?: ClusterDasConfigInfo;
  dasVmConfigSpec?: ClusterDasVmConfigSpec[];
  drsConfig?: ClusterDrsConfigInfo;
  drsVmConfigSpec?: ClusterDrsVmConfigSpec[];
  rulesSpec?: ClusterRuleSpec[];
}
