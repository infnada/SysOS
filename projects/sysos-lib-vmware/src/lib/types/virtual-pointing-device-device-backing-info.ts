import {VirtualDeviceDeviceBackingInfo} from './virtual-device-device-backing-info';

export interface VirtualPointingDeviceDeviceBackingInfo extends VirtualDeviceDeviceBackingInfo {
  hostPointingDevice: string;
}
