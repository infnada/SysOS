import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
import {ReplicationVmProgressInfo} from './replication-vm-progress-info';

export interface HbrManagerReplicationVmInfo extends DynamicData {
  imageId?: string;
  lastError?: LocalizedMethodFault;
  progressInfo?: ReplicationVmProgressInfo;
  state: string;
}