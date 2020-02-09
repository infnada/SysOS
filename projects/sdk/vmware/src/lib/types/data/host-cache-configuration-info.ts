import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface HostCacheConfigurationInfo extends DynamicData {
  key: ManagedObjectReference & { $type: 'Datastore'; };
  swapSize: number;
}