import {DynamicData} from './dynamic-data';

import {DeviceGroupId} from './device-group-id';
import {FaultDomainId} from './fault-domain-id';

export interface ReplicationGroupId extends DynamicData {
  deviceGroupId: DeviceGroupId;
  faultDomainId: FaultDomainId;
}