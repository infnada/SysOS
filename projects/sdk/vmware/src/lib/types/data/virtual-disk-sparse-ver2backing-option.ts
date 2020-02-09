import {VirtualDeviceFileBackingOption} from './virtual-device-file-backing-option';

import {ChoiceOption} from './choice-option';
import {BoolOption} from './bool-option';

export interface VirtualDiskSparseVer2BackingOption extends VirtualDeviceFileBackingOption {
  diskMode: ChoiceOption;
  growable: boolean;
  hotGrowable: boolean;
  split: BoolOption;
  uuid: boolean;
  writeThrough: BoolOption;
}