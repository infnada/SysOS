import {VirtualControllerOption} from './virtual-controller-option';

import {BoolOption} from './bool-option';
import {IntOption} from './int-option';
import {VirtualSCSISharing} from '../enums/virtual-s-c-s-i-sharing';

export interface VirtualSCSIControllerOption extends VirtualControllerOption {
  defaultSharedIndex: number;
  hotAddRemove: BoolOption;
  numSCSICdroms: IntOption;
  numSCSIDisks: IntOption;
  numSCSIPassthrough: IntOption;
  scsiCtlrUnitNumber: number;
  sharing: VirtualSCSISharing[];
}