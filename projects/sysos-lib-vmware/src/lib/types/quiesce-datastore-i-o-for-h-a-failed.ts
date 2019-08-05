import {ResourceInUse} from './resource-in-use';

import {ManagedObjectReference} from './managed-object-reference';
import {ManagedObjectReference} from './managed-object-reference';
export interface QuiesceDatastoreIOForHAFailed extends ResourceInUse {
  ds: ManagedObjectReference & { $type: 'Datastore' };
  dsName: string;
  host: ManagedObjectReference & { $type: 'HostSystem' };
  hostName: string;
}
