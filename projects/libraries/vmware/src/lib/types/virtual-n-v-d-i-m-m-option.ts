import {VirtualDeviceOption} from './virtual-device-option';

import {LongOption} from './long-option';
import {Long} from './long';
export interface VirtualNVDIMMOption extends VirtualDeviceOption {
  capacityInMB: LongOption;
  granularityInMB: Long;
  growable: boolean;
  hotGrowable: boolean;
}
