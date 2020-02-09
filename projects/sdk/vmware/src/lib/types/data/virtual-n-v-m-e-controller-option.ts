import {VirtualControllerOption} from './virtual-controller-option';

import {IntOption} from './int-option';

export interface VirtualNVMEControllerOption extends VirtualControllerOption {
  numNVMEDisks: IntOption;
}