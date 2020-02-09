import {VmEvent} from './vm-event';

import {LocalizedMethodFault} from './localized-method-fault';

export interface VmFailedToPowerOnEvent extends VmEvent {
  reason: LocalizedMethodFault;
}