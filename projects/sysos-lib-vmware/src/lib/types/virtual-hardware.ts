import {DynamicData} from './dynamic-data';

import {VirtualDevice} from './virtual-device';
import {Int} from './int';
export interface VirtualHardware extends DynamicData {
  device?: VirtualDevice[];
  memoryMB: Int;
  numCoresPerSocket?: Int;
  numCPU: Int;
  virtualSMCPresent?: boolean;
}
