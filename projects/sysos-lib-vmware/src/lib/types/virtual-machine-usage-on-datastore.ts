import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {Long} from './long';
export interface VirtualMachineUsageOnDatastore extends DynamicData {
  committed: Long;
  datastore: ManagedObjectReference & { $type: 'Datastore' };
  uncommitted: Long;
  unshared: Long;
}
