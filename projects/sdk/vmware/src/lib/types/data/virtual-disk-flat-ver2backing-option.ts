import {VirtualDeviceFileBackingOption} from './virtual-device-file-backing-option';

import {ChoiceOption} from './choice-option';
import {VirtualDiskDeltaDiskFormatsSupported} from './virtual-disk-delta-disk-formats-supported';
import {BoolOption} from './bool-option';

export interface VirtualDiskFlatVer2BackingOption extends VirtualDeviceFileBackingOption {
  deltaDiskFormat: ChoiceOption;
  deltaDiskFormatsSupported: VirtualDiskDeltaDiskFormatsSupported[];
  diskMode: ChoiceOption;
  eagerlyScrub: BoolOption;
  growable: boolean;
  hotGrowable: boolean;
  split: BoolOption;
  thinProvisioned: BoolOption;
  uuid: boolean;
  writeThrough: BoolOption;
}