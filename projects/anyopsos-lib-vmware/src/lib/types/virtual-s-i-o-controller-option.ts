import {VirtualControllerOption} from './virtual-controller-option';

import {IntOption} from './int-option';
export interface VirtualSIOControllerOption extends VirtualControllerOption {
  numFloppyDrives: IntOption;
  numParallelPorts: IntOption;
  numSerialPorts: IntOption;
}
