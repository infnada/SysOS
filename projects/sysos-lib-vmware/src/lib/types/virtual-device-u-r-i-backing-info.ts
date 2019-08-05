import {VirtualDeviceBackingInfo} from './virtual-device-backing-info';

export interface VirtualDeviceURIBackingInfo extends VirtualDeviceBackingInfo {
  direction: string;
  proxyURI?: string;
  serviceURI: string;
}
