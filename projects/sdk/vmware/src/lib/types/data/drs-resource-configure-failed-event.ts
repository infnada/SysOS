import {HostEvent} from './host-event';

import {LocalizedMethodFault} from './localized-method-fault';

export interface DrsResourceConfigureFailedEvent extends HostEvent {
  reason: LocalizedMethodFault;
}