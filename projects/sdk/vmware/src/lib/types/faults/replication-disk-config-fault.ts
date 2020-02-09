import {ReplicationConfigFault} from './replication-config-fault';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface ReplicationDiskConfigFault extends ReplicationConfigFault {
  key?: number;
  reason?: string;
  vmRef?: ManagedObjectReference & { $type: 'VirtualMachine'; };
}