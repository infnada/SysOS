import {VirtualDeviceBackingInfo} from './virtual-device-backing-info';

import {VirtualPCIPassthroughDeviceBackingInfo} from './virtual-p-c-i-passthrough-device-backing-info';
import {Int} from './int';
export interface VirtualSriovEthernetCardSriovBackingInfo extends VirtualDeviceBackingInfo {
  physicalFunctionBacking?: VirtualPCIPassthroughDeviceBackingInfo;
  virtualFunctionBacking?: VirtualPCIPassthroughDeviceBackingInfo;
  virtualFunctionIndex?: Int;
}
