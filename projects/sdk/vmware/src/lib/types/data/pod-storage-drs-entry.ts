import {DynamicData} from './dynamic-data';

import {ClusterActionHistory} from './cluster-action-history';
import {ClusterDrsFaults} from './cluster-drs-faults';
import {ClusterRecommendation} from './cluster-recommendation';
import {StorageDrsConfigInfo} from './storage-drs-config-info';

export interface PodStorageDrsEntry extends DynamicData {
  actionHistory?: ClusterActionHistory[];
  drsFault?: ClusterDrsFaults[];
  recommendation?: ClusterRecommendation[];
  storageDrsConfig: StorageDrsConfigInfo;
}