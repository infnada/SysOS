import {DynamicData} from './dynamic-data';

import {HostHardwareStatusInfo} from './host-hardware-status-info';
import {HostSystemHealthInfo} from './host-system-health-info';

export interface HealthSystemRuntime extends DynamicData {
  hardwareStatusInfo?: HostHardwareStatusInfo;
  systemHealthInfo?: HostSystemHealthInfo;
}