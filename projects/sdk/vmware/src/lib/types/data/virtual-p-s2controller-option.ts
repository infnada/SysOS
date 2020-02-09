import {VirtualControllerOption} from './virtual-controller-option';

import {IntOption} from './int-option';

export interface VirtualPS2ControllerOption extends VirtualControllerOption {
  numKeyboards: IntOption;
  numPointingDevices: IntOption;
}