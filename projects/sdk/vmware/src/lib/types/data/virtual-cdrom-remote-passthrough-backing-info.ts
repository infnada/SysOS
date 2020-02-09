import {VirtualDeviceRemoteDeviceBackingInfo} from './virtual-device-remote-device-backing-info';


export interface VirtualCdromRemotePassthroughBackingInfo extends VirtualDeviceRemoteDeviceBackingInfo {
  exclusive: boolean;
}