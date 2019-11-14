import {EVCConfigFault} from './e-v-c-config-fault';

import {ManagedObjectReference} from './managed-object-reference';
export interface ActiveVMsBlockingEVC extends EVCConfigFault {
  evcMode?: string;
  host?: ManagedObjectReference[] & { $type: 'HostSystem[]' };
  hostName?: string[];
}
