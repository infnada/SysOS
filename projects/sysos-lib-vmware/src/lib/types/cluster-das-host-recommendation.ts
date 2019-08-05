import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {Int} from './int';
export interface ClusterDasHostRecommendation extends DynamicData {
  drsRating?: Int;
  host: ManagedObjectReference & { $type: 'HostSystem' };
}
