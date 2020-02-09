import {VirtualDeviceBackingOption} from './virtual-device-backing-option';

import {BoolOption} from './bool-option';

export interface VirtualDeviceDeviceBackingOption extends VirtualDeviceBackingOption {
  autoDetectAvailable: BoolOption;
}