import {VmEvent} from './vm-event';

import {LocalizedMethodFault} from './localized-method-fault';

export interface VmFailedToPowerOffEvent extends VmEvent {
  reason: LocalizedMethodFault;
}