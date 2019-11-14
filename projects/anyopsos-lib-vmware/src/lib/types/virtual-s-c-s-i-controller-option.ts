import {VirtualControllerOption} from './virtual-controller-option';

import {BoolOption} from './bool-option';
import {IntOption} from './int-option';
import {VirtualSCSISharing} from './virtual-s-c-s-i-sharing';
import {Int} from './int';
export interface VirtualSCSIControllerOption extends VirtualControllerOption {
  defaultSharedIndex: Int;
  hotAddRemove: BoolOption;
  numSCSICdroms: IntOption;
  numSCSIDisks: IntOption;
  numSCSIPassthrough: IntOption;
  scsiCtlrUnitNumber: Int;
  sharing: VirtualSCSISharing[];
}
