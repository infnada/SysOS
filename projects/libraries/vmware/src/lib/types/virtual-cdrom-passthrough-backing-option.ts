import {VirtualDeviceDeviceBackingOption} from './virtual-device-device-backing-option';

import {BoolOption} from './bool-option';
export interface VirtualCdromPassthroughBackingOption extends VirtualDeviceDeviceBackingOption {
  exclusive: BoolOption;
}
