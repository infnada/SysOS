import {VirtualDeviceFileBackingOption} from './virtual-device-file-backing-option';

import {ChoiceOption} from './choice-option';

export interface VirtualDiskLocalPMemBackingOption extends VirtualDeviceFileBackingOption {
  diskMode: ChoiceOption;
  growable: boolean;
  hotGrowable: boolean;
  uuid: boolean;
}