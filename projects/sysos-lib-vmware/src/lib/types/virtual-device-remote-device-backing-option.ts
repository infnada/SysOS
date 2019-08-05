import {VirtualDeviceBackingOption} from './virtual-device-backing-option';

import {BoolOption} from './bool-option';
export interface VirtualDeviceRemoteDeviceBackingOption extends VirtualDeviceBackingOption {
  autoDetectAvailable: BoolOption;
}
