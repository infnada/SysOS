import {ReplicationFault} from './replication-fault';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface ReplicationInvalidOptions extends ReplicationFault {
  entity?: ManagedObjectReference & { $type: 'ManagedEntity'; };
  options: string;
}