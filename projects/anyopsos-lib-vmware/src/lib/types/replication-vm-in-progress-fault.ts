import {ReplicationVmFault} from './replication-vm-fault';

export interface ReplicationVmInProgressFault extends ReplicationVmFault {
  inProgressActivity: string;
  requestedActivity: string;
}
