import {ArrayUpdateSpec} from './array-update-spec';

import {ClusterVmOrchestrationInfo} from './cluster-vm-orchestration-info';

export interface ClusterVmOrchestrationSpec extends ArrayUpdateSpec {
  info?: ClusterVmOrchestrationInfo;
}