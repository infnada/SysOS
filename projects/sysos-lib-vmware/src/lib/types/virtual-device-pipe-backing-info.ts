import {VirtualDeviceBackingInfo} from './virtual-device-backing-info';

export interface VirtualDevicePipeBackingInfo extends VirtualDeviceBackingInfo {
  pipeName: string;
}
