import {VirtualControllerOption} from './virtual-controller-option';

import {IntOption} from './int-option';

export interface VirtualIDEControllerOption extends VirtualControllerOption {
  numIDECdroms: IntOption;
  numIDEDisks: IntOption;
}