import {VirtualDeviceDeviceBackingInfo} from './virtual-device-device-backing-info';


export interface VirtualCdromPassthroughBackingInfo extends VirtualDeviceDeviceBackingInfo {
  exclusive: boolean;
}