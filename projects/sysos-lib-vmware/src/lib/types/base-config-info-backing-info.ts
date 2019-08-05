import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
export interface BaseConfigInfoBackingInfo extends DynamicData {
  datastore: ManagedObjectReference & { $type: 'Datastore' };
}
