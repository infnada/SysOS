import {ReplicationConfigFault} from './replication-config-fault';

import {ManagedObjectReference} from './managed-object-reference';
import {Int} from './int';
export interface ReplicationDiskConfigFault extends ReplicationConfigFault {
  key?: Int;
  reason?: string;
  vmRef?: ManagedObjectReference & { $type: 'VirtualMachine' };
}
