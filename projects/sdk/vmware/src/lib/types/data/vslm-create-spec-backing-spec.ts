import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface VslmCreateSpecBackingSpec extends DynamicData {
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  path?: string;
}