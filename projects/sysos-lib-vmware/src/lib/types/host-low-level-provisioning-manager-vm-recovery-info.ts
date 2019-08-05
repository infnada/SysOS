import {DynamicData} from './dynamic-data';

import {FaultToleranceConfigInfo} from './fault-tolerance-config-info';
export interface HostLowLevelProvisioningManagerVmRecoveryInfo extends DynamicData {
  biosUUID: string;
  ftInfo?: FaultToleranceConfigInfo;
  instanceUUID: string;
  version: string;
}
