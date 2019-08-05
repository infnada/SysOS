import {ReplicationFault} from './replication-fault';

export interface IncompatibleHostForVmReplication extends ReplicationFault {
  hostName: string;
  reason: string;
  vmName: string;
}
