import {InsufficientResourcesFault} from './insufficient-resources-fault';

import {ManagedObjectReference} from './managed-object-reference';
export interface InsufficientHostCapacityFault extends InsufficientResourcesFault {
  host?: ManagedObjectReference & { $type: 'HostSystem' };
}
