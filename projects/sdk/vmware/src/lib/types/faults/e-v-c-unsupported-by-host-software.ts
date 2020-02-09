import {EVCConfigFault} from './e-v-c-config-fault';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface EVCUnsupportedByHostSoftware extends EVCConfigFault {
  host: ManagedObjectReference & { $type: 'HostSystem[]'; };
  hostName: string[];
}