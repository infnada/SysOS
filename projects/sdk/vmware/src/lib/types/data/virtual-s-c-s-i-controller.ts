import {VirtualController} from './virtual-controller';

import {VirtualSCSISharing} from '../enums/virtual-s-c-s-i-sharing';

export interface VirtualSCSIController extends VirtualController {
  hotAddRemove?: boolean;
  scsiCtlrUnitNumber?: number;
  sharedBus: VirtualSCSISharing;
}