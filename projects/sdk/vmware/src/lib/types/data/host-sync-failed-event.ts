import {HostEvent} from './host-event';

import {LocalizedMethodFault} from './localized-method-fault';

export interface HostSyncFailedEvent extends HostEvent {
  reason: LocalizedMethodFault;
}