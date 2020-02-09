import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface StorageRequirement extends DynamicData {
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  freeSpaceRequiredInKb: number;
}