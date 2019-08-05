import {VmEvent} from './vm-event';

import {LocalizedMethodFault} from './localized-method-fault';
export interface VmFailedToResetEvent extends VmEvent {
  reason: LocalizedMethodFault;
}
