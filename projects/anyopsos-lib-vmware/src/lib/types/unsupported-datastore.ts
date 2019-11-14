import {VmConfigFault} from './vm-config-fault';

import {ManagedObjectReference} from './managed-object-reference';
export interface UnsupportedDatastore extends VmConfigFault {
  datastore?: ManagedObjectReference & { $type: 'Datastore' };
}
