import {RuntimeFault} from './runtime-fault';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface DisallowedOperationOnFailoverHost extends RuntimeFault {
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  hostname: string;
}