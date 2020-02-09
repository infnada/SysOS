import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface HostCacheConfigurationSpec extends DynamicData {
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  swapSize: number;
}