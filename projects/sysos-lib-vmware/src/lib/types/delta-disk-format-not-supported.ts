import {VmConfigFault} from './vm-config-fault';

import {ManagedObjectReference} from './managed-object-reference';
export interface DeltaDiskFormatNotSupported extends VmConfigFault {
  datastore?: ManagedObjectReference[] & { $type: 'Datastore[]' };
  deltaDiskFormat: string;
}
