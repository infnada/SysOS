import {VirtualControllerOption} from './virtual-controller-option';

import {IntOption} from './int-option';

export interface VirtualSATAControllerOption extends VirtualControllerOption {
  numSATACdroms: IntOption;
  numSATADisks: IntOption;
}