import {DynamicData} from './dynamic-data';

import {ClusterDrsFaults} from './cluster-drs-faults';
import {ClusterRecommendation} from './cluster-recommendation';
import {ManagedObjectReference} from './managed-object-reference';
export interface StoragePlacementResult extends DynamicData {
  drsFault?: ClusterDrsFaults;
  recommendations?: ClusterRecommendation[];
  task?: ManagedObjectReference & { $type: 'Task' };
}
