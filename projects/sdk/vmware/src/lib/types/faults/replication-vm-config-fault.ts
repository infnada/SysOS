import {ReplicationConfigFault} from './replication-config-fault';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface ReplicationVmConfigFault extends ReplicationConfigFault {
  reason?: string;
  vmRef?: ManagedObjectReference & { $type: 'VirtualMachine'; };
}