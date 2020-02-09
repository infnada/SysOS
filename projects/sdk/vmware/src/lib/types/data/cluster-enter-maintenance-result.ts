import {DynamicData} from './dynamic-data';

import {ClusterDrsFaults} from './cluster-drs-faults';
import {ClusterRecommendation} from './cluster-recommendation';

export interface ClusterEnterMaintenanceResult extends DynamicData {
  fault?: ClusterDrsFaults;
  recommendations?: ClusterRecommendation[];
}