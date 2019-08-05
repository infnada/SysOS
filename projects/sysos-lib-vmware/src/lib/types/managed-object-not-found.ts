import {RuntimeFault} from './runtime-fault';

import {ManagedObjectReference} from './managed-object-reference';
export interface ManagedObjectNotFound extends RuntimeFault {
  obj: ManagedObjectReference;
}
