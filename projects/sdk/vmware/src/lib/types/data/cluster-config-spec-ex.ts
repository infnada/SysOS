import {ComputeResourceConfigSpec} from './compute-resource-config-spec';

import {ClusterDasConfigInfo} from './cluster-das-config-info';
import {ClusterDasVmConfigSpec} from './cluster-das-vm-config-spec';
import {ClusterDpmConfigInfo} from './cluster-dpm-config-info';
import {ClusterDpmHostConfigSpec} from './cluster-dpm-host-config-spec';
import {ClusterDrsConfigInfo} from './cluster-drs-config-info';
import {ClusterDrsVmConfigSpec} from './cluster-drs-vm-config-spec';
import {ClusterGroupSpec} from './cluster-group-spec';
import {ClusterInfraUpdateHaConfigInfo} from './cluster-infra-update-ha-config-info';
import {ClusterOrchestrationInfo} from './cluster-orchestration-info';
import {ClusterProactiveDrsConfigInfo} from './cluster-proactive-drs-config-info';
import {ClusterRuleSpec} from './cluster-rule-spec';
import {ClusterVmOrchestrationSpec} from './cluster-vm-orchestration-spec';
import {VsanClusterConfigInfo} from './vsan-cluster-config-info';
import {VsanHostConfigInfo} from './vsan-host-config-info';

export interface ClusterConfigSpecEx extends ComputeResourceConfigSpec {
  dasConfig?: ClusterDasConfigInfo;
  dasVmConfigSpec?: ClusterDasVmConfigSpec[];
  dpmConfig?: ClusterDpmConfigInfo;
  dpmHostConfigSpec?: ClusterDpmHostConfigSpec[];
  drsConfig?: ClusterDrsConfigInfo;
  drsVmConfigSpec?: ClusterDrsVmConfigSpec[];
  groupSpec?: ClusterGroupSpec[];
  infraUpdateHaConfig?: ClusterInfraUpdateHaConfigInfo;
  inHciWorkflow?: boolean;
  orchestration?: ClusterOrchestrationInfo;
  proactiveDrsConfig?: ClusterProactiveDrsConfigInfo;
  rulesSpec?: ClusterRuleSpec[];
  vmOrchestrationSpec?: ClusterVmOrchestrationSpec[];
  vsanConfig?: VsanClusterConfigInfo;
  vsanHostConfigSpec?: VsanHostConfigInfo[];
}