import {DynamicData} from './dynamic-data';

import {ClusterDrsFaults} from './cluster-drs-faults';
import {ClusterRecommendation} from './cluster-recommendation';
export interface PlacementResult extends DynamicData {
  drsFault?: ClusterDrsFaults;
  recommendations?: ClusterRecommendation[];
}
