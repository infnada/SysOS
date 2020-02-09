import {VirtualDeviceDeviceBackingOption} from './virtual-device-device-backing-option';

import {ChoiceOption} from './choice-option';

export interface VirtualPointingDeviceBackingOption extends VirtualDeviceDeviceBackingOption {
  hostPointingDevice: ChoiceOption;
}