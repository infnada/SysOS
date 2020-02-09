import {VmEvent} from './vm-event';

import {LocalizedMethodFault} from './localized-method-fault';

export interface VmFailedToShutdownGuestEvent extends VmEvent {
  reason: LocalizedMethodFault;
}