import {VirtualDevicePipeBackingOption} from './virtual-device-pipe-backing-option';

import {ChoiceOption} from './choice-option';
import {BoolOption} from './bool-option';

export interface VirtualSerialPortPipeBackingOption extends VirtualDevicePipeBackingOption {
  endpoint: ChoiceOption;
  noRxLoss: BoolOption;
}