import {DynamicData} from './dynamic-data';

import {HostGraphicsConfigDeviceType} from './host-graphics-config-device-type';
export interface HostGraphicsConfig extends DynamicData {
  deviceType?: HostGraphicsConfigDeviceType[];
  hostDefaultGraphicsType: string;
  sharedPassthruAssignmentPolicy: string;
}
