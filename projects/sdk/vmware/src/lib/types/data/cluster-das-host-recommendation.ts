import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface ClusterDasHostRecommendation extends DynamicData {
  drsRating?: number;
  host: ManagedObjectReference & { $type: 'HostSystem'; };
}