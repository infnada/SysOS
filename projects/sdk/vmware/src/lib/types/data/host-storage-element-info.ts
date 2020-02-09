import {HostHardwareElementInfo} from './host-hardware-element-info';

import {HostStorageOperationalInfo} from './host-storage-operational-info';

export interface HostStorageElementInfo extends HostHardwareElementInfo {
  operationalInfo?: HostStorageOperationalInfo[];
}