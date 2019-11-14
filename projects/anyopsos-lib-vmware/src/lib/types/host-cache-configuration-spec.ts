import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {Long} from './long';
export interface HostCacheConfigurationSpec extends DynamicData {
  datastore: ManagedObjectReference & { $type: 'Datastore' };
  swapSize: Long;
}
