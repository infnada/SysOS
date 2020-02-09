import {VirtualDeviceOption} from './virtual-device-option';

import {LongOption} from './long-option';

export interface VirtualNVDIMMOption extends VirtualDeviceOption {
  capacityInMB: LongOption;
  granularityInMB: number;
  growable: boolean;
  hotGrowable: boolean;
}