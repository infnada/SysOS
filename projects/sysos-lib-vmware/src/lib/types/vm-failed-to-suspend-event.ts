import {VmEvent} from './vm-event';

import {LocalizedMethodFault} from './localized-method-fault';
export interface VmFailedToSuspendEvent extends VmEvent {
  reason: LocalizedMethodFault;
}
