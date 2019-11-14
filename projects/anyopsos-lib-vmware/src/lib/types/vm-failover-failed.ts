import {VmEvent} from './vm-event';

import {LocalizedMethodFault} from './localized-method-fault';
export interface VmFailoverFailed extends VmEvent {
  reason?: LocalizedMethodFault;
}
