import {VirtualDeviceOption} from './virtual-device-option';

import {LongOption} from './long-option';
import {BoolOption} from './bool-option';
import {IntOption} from './int-option';
export interface VirtualVideoCardOption extends VirtualDeviceOption {
  graphicsMemorySizeInKB?: LongOption;
  graphicsMemorySizeSupported?: BoolOption;
  numDisplays?: IntOption;
  useAutoDetect?: BoolOption;
  videoRamSizeInKB?: LongOption;
}
