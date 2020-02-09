import {ComputeResourceConfigInfo} from './compute-resource-config-info';

import {ClusterDasConfigInfo} from './cluster-das-config-info';
import {ClusterDasVmConfigInfo} from './cluster-das-vm-config-info';
import {ClusterDpmConfigInfo} from './cluster-dpm-config-info';
import {ClusterDpmHostConfigInfo} from './cluster-dpm-host-config-info';
import {ClusterDrsConfigInfo} from './cluster-drs-config-info';
import {ClusterDrsVmConfigInfo} from './cluster-drs-vm-config-info';
import {ClusterGroupInfo} from './cluster-group-info';
import {ClusterInfraUpdateHaConfigInfo} from './cluster-infra-update-ha-config-info';
import {ClusterOrchestrationInfo} from './cluster-orchestration-info';
import {ClusterProactiveDrsConfigInfo} from './cluster-proactive-drs-config-info';
import {ClusterRuleInfo} from './cluster-rule-info';
import {ClusterVmOrchestrationInfo} from './cluster-vm-orchestration-info';
import {VsanClusterConfigInfo} from './vsan-cluster-config-info';
import {VsanHostConfigInfo} from './vsan-host-config-info';

export interface ClusterConfigInfoEx extends ComputeResourceConfigInfo {
  dasConfig: ClusterDasConfigInfo;
  dasVmConfig?: ClusterDasVmConfigInfo[];
  dpmConfigInfo?: ClusterDpmConfigInfo;
  dpmHostConfig?: ClusterDpmHostConfigInfo[];
  drsConfig: ClusterDrsConfigInfo;
  drsVmConfig?: ClusterDrsVmConfigInfo[];
  group?: ClusterGroupInfo[];
  infraUpdateHaConfig?: ClusterInfraUpdateHaConfigInfo;
  orchestration?: ClusterOrchestrationInfo;
  proactiveDrsConfig?: ClusterProactiveDrsConfigInfo;
  rule?: ClusterRuleInfo[];
  vmOrchestration?: ClusterVmOrchestrationInfo[];
  vsanConfigInfo?: VsanClusterConfigInfo;
  vsanHostConfig?: VsanHostConfigInfo[];
}