import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {ID} from './i-d';

export interface RetrieveVStorageObjSpec extends DynamicData {
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  id: ID;
}