import {VirtualDeviceBackingInfo} from './virtual-device-backing-info';


export interface VirtualDeviceRemoteDeviceBackingInfo extends VirtualDeviceBackingInfo {
  deviceName: string;
  useAutoDetect?: boolean;
}