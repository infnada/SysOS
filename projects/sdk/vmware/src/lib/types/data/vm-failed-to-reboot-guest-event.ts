import {VmEvent} from './vm-event';

import {LocalizedMethodFault} from './localized-method-fault';

export interface VmFailedToRebootGuestEvent extends VmEvent {
  reason: LocalizedMethodFault;
}