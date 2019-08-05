import {VirtualDeviceOption} from './virtual-device-option';

import {BoolOption} from './bool-option';
export interface VirtualSerialPortOption extends VirtualDeviceOption {
  yieldOnPoll: BoolOption;
}
