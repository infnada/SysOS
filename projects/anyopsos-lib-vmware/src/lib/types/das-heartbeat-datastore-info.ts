import {DynamicData} from './dynamic-data';
import {ManagedObjectReference} from './managed-object-reference';

export interface DasHeartbeatDatastoreInfo extends DynamicData {
  datastore: ManagedObjectReference & { $type: 'Datastore' };
  hosts: ManagedObjectReference[] & { $type: 'HostSystem' };
}
