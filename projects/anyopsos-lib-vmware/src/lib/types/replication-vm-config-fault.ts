import {ReplicationConfigFault} from './replication-config-fault';

import {ManagedObjectReference} from './managed-object-reference';
export interface ReplicationVmConfigFault extends ReplicationConfigFault {
  reason?: string;
  vmRef?: ManagedObjectReference & { $type: 'VirtualMachine' };
}
