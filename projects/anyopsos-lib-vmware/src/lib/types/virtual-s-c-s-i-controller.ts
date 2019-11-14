import {VirtualController} from './virtual-controller';

import {VirtualSCSISharing} from './virtual-s-c-s-i-sharing';
import {Int} from './int';
export interface VirtualSCSIController extends VirtualController {
  hotAddRemove?: boolean;
  scsiCtlrUnitNumber?: Int;
  sharedBus: VirtualSCSISharing;
}
