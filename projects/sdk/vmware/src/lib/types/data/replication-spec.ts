import {DynamicData} from './dynamic-data';

import {ReplicationGroupId} from './replication-group-id';

export interface ReplicationSpec extends DynamicData {
  replicationGroupId: ReplicationGroupId;
}