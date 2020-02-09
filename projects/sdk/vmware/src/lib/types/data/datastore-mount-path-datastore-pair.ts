import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface DatastoreMountPathDatastorePair extends DynamicData {
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  oldMountPath: string;
}