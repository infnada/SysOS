import {VirtualDeviceFileBackingOption} from './virtual-device-file-backing-option';

import {ChoiceOption} from './choice-option';
import {BoolOption} from './bool-option';

export interface VirtualDiskFlatVer1BackingOption extends VirtualDeviceFileBackingOption {
  diskMode: ChoiceOption;
  growable: boolean;
  split: BoolOption;
  writeThrough: BoolOption;
}