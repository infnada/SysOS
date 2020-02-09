import {VirtualDeviceBackingOption} from './virtual-device-backing-option';

import {ChoiceOption} from './choice-option';

export interface VirtualDeviceURIBackingOption extends VirtualDeviceBackingOption {
  directions: ChoiceOption;
}