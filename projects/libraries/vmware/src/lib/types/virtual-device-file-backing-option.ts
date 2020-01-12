import {VirtualDeviceBackingOption} from './virtual-device-backing-option';

import {ChoiceOption} from './choice-option';
export interface VirtualDeviceFileBackingOption extends VirtualDeviceBackingOption {
  fileNameExtensions?: ChoiceOption;
}
