import {VirtualControllerOption} from './virtual-controller-option';

import {BoolOption} from './bool-option';
export interface VirtualUSBControllerOption extends VirtualControllerOption {
  autoConnectDevices: BoolOption;
  ehciSupported: BoolOption;
  supportedSpeeds: string[];
}
