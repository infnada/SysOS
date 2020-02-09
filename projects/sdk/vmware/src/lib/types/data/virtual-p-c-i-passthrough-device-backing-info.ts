import {VirtualDeviceDeviceBackingInfo} from './virtual-device-device-backing-info';


export interface VirtualPCIPassthroughDeviceBackingInfo extends VirtualDeviceDeviceBackingInfo {
  deviceId: string;
  id: string;
  systemId: string;
  vendorId: number;
}