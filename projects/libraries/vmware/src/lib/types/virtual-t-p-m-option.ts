import {VirtualDeviceOption} from './virtual-device-option';

export interface VirtualTPMOption extends VirtualDeviceOption {
  supportedFirmware?: string[];
}
