import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface ClusterHostRecommendation extends DynamicData {
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  rating: number;
}