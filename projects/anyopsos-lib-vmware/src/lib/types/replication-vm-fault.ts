import {ReplicationFault} from './replication-fault';

import {ManagedObjectReference} from './managed-object-reference';
export interface ReplicationVmFault extends ReplicationFault {
  instanceId?: string;
  reason: string;
  state?: string;
  vm: ManagedObjectReference & { $type: 'VirtualMachine' };
}
