import {VirtualDeviceDeviceBackingInfo} from './virtual-device-device-backing-info';
import {Short} from './short';

export interface VirtualPCIPassthroughDeviceBackingInfo extends VirtualDeviceDeviceBackingInfo {
  deviceId: string;
  id: string;
  systemId: string;
  vendorId: Short;
}
