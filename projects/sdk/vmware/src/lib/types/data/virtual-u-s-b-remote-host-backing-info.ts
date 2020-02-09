import {VirtualDeviceDeviceBackingInfo} from './virtual-device-device-backing-info';


export interface VirtualUSBRemoteHostBackingInfo extends VirtualDeviceDeviceBackingInfo {
  hostname: string;
}