import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {Int} from './int';
export interface ClusterHostRecommendation extends DynamicData {
  host: ManagedObjectReference & { $type: 'HostSystem' };
  rating: Int;
}
