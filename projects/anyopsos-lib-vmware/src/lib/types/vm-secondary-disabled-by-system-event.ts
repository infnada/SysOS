import {VmEvent} from './vm-event';

import {LocalizedMethodFault} from './localized-method-fault';
export interface VmSecondaryDisabledBySystemEvent extends VmEvent {
  reason?: LocalizedMethodFault;
}
