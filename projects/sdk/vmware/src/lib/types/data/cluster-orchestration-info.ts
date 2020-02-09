import {DynamicData} from './dynamic-data';

import {ClusterVmReadiness} from './cluster-vm-readiness';

export interface ClusterOrchestrationInfo extends DynamicData {
  defaultVmReadiness?: ClusterVmReadiness;
}