import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {Long} from './long';
export interface HostCacheConfigurationInfo extends DynamicData {
  key: ManagedObjectReference & { $type: 'Datastore' };
  swapSize: Long;
}
