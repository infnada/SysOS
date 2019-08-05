import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {Long} from './long';
export interface StorageRequirement extends DynamicData {
  datastore: ManagedObjectReference & { $type: 'Datastore' };
  freeSpaceRequiredInKb: Long;
}
