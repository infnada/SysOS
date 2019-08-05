import {VirtualDeviceBackingInfo} from './virtual-device-backing-info';

export interface VirtualDeviceDeviceBackingInfo extends VirtualDeviceBackingInfo {
  deviceName: string;
  useAutoDetect?: boolean;
}
