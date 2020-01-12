import {VmEvent} from './vm-event';

import {LocalizedMethodFault} from './localized-method-fault';
export interface VmFailedRelayoutEvent extends VmEvent {
  reason: LocalizedMethodFault;
}
