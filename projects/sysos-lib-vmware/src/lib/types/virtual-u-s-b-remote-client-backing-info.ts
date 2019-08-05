import {VirtualDeviceRemoteDeviceBackingInfo} from './virtual-device-remote-device-backing-info';

export interface VirtualUSBRemoteClientBackingInfo extends VirtualDeviceRemoteDeviceBackingInfo {
  hostname: string;
}
