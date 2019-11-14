import {EVCConfigFault} from './e-v-c-config-fault';

import {ManagedObjectReference} from './managed-object-reference';
export interface EVCModeUnsupportedByHosts extends EVCConfigFault {
  evcMode?: string;
  host?: ManagedObjectReference[] & { $type: 'HostSystem[]' };
  hostName?: string[];
}
