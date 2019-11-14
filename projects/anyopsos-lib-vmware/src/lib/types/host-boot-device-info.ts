import {DynamicData} from './dynamic-data';

import {HostBootDevice} from './host-boot-device';
export interface HostBootDeviceInfo extends DynamicData {
  bootDevices?: HostBootDevice[];
  currentBootDeviceKey?: string;
}
