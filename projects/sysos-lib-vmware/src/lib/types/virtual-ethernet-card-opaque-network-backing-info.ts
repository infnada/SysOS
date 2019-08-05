import {VirtualDeviceBackingInfo} from './virtual-device-backing-info';

export interface VirtualEthernetCardOpaqueNetworkBackingInfo extends VirtualDeviceBackingInfo {
  opaqueNetworkId: string;
  opaqueNetworkType: string;
}
