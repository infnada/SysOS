import {DynamicData} from './dynamic-data';

import {ClusterConfigSpecEx} from './cluster-config-spec-ex';

export interface ClusterComputeResourceVCProfile extends DynamicData {
  clusterSpec?: ClusterConfigSpecEx;
  evcModeKey?: string;
}