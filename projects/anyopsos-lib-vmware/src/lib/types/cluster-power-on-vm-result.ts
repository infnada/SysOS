import {DynamicData} from './dynamic-data';

import {ClusterAttemptedVmInfo} from './cluster-attempted-vm-info';
import {ClusterNotAttemptedVmInfo} from './cluster-not-attempted-vm-info';
import {ClusterRecommendation} from './cluster-recommendation';
export interface ClusterPowerOnVmResult extends DynamicData {
  attempted?: ClusterAttemptedVmInfo[];
  notAttempted?: ClusterNotAttemptedVmInfo[];
  recommendations?: ClusterRecommendation[];
}
