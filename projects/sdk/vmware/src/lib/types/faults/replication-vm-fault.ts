import {ReplicationFault} from './replication-fault';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface ReplicationVmFault extends ReplicationFault {
  instanceId?: string;
  reason: string;
  state?: string;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
}