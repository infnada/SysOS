import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface FaultToleranceMetaSpec extends DynamicData {
  metaDataDatastore: ManagedObjectReference & { $type: 'Datastore'; };
}