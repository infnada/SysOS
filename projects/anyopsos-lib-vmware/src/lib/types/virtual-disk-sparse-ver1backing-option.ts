import {VirtualDeviceFileBackingOption} from './virtual-device-file-backing-option';

import {ChoiceOption} from './choice-option';
import {BoolOption} from './bool-option';
export interface VirtualDiskSparseVer1BackingOption extends VirtualDeviceFileBackingOption {
  diskModes: ChoiceOption;
  growable: boolean;
  split: BoolOption;
  writeThrough: BoolOption;
}
