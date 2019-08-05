import {VmEvent} from './vm-event';

import {LocalizedMethodFault} from './localized-method-fault';
export interface VmFailedToStandbyGuestEvent extends VmEvent {
  reason: LocalizedMethodFault;
}
