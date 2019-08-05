import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
import {ManagedObjectReference} from './managed-object-reference';
export interface HostDatastoreSystemDatastoreResult extends DynamicData {
  fault?: LocalizedMethodFault;
  key: ManagedObjectReference & { $type: 'Datastore' };
}
