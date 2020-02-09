import {DynamicData} from './dynamic-data';

import {VirtualDevice} from './virtual-device';

export interface VirtualHardware extends DynamicData {
  device?: VirtualDevice[];
  memoryMB: number;
  numCoresPerSocket?: number;
  numCPU: number;
  virtualICH7MPresent?: boolean;
  virtualSMCPresent?: boolean;
}