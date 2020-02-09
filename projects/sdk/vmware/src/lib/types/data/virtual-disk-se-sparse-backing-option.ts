import {VirtualDeviceFileBackingOption} from './virtual-device-file-backing-option';

import {VirtualDiskDeltaDiskFormatsSupported} from './virtual-disk-delta-disk-formats-supported';
import {ChoiceOption} from './choice-option';
import {BoolOption} from './bool-option';

export interface VirtualDiskSeSparseBackingOption extends VirtualDeviceFileBackingOption {
  deltaDiskFormatsSupported: VirtualDiskDeltaDiskFormatsSupported[];
  diskMode: ChoiceOption;
  growable: boolean;
  hotGrowable: boolean;
  uuid: boolean;
  writeThrough: BoolOption;
}