import {VirtualControllerOption} from './virtual-controller-option';

import {BoolOption} from './bool-option';
export interface VirtualUSBXHCIControllerOption extends VirtualControllerOption {
  autoConnectDevices: BoolOption;
  supportedSpeeds: string[];
}
