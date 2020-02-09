import {VirtualDeviceBackingInfo} from './virtual-device-backing-info';

import {VirtualPCIPassthroughDeviceBackingInfo} from './virtual-p-c-i-passthrough-device-backing-info';

export interface VirtualSriovEthernetCardSriovBackingInfo extends VirtualDeviceBackingInfo {
  physicalFunctionBacking?: VirtualPCIPassthroughDeviceBackingInfo;
  virtualFunctionBacking?: VirtualPCIPassthroughDeviceBackingInfo;
  virtualFunctionIndex?: number;
}