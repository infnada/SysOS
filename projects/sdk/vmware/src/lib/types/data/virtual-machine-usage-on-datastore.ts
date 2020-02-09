import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface VirtualMachineUsageOnDatastore extends DynamicData {
  committed: number;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  uncommitted: number;
  unshared: number;
}