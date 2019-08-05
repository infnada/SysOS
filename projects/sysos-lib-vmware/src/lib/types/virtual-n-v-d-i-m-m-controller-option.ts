import {VirtualControllerOption} from './virtual-controller-option';

import {IntOption} from './int-option';
export interface VirtualNVDIMMControllerOption extends VirtualControllerOption {
  numNVDIMMControllers: IntOption;
}
