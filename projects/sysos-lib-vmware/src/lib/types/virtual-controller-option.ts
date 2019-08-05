import {VirtualDeviceOption} from './virtual-device-option';

import {IntOption} from './int-option';
export interface VirtualControllerOption extends VirtualDeviceOption {
  devices: IntOption;
  supportedDevice?: string[];
}
