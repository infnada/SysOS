import {DynamicData} from './dynamic-data';

import {HostHardwareElementInfo} from './host-hardware-element-info';
import {HostStorageElementInfo} from './host-storage-element-info';

export interface HostHardwareStatusInfo extends DynamicData {
  cpuStatusInfo?: HostHardwareElementInfo[];
  memoryStatusInfo?: HostHardwareElementInfo[];
  storageStatusInfo?: HostStorageElementInfo[];
}