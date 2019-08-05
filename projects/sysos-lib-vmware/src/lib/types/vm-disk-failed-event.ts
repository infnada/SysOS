import {VmEvent} from './vm-event';

import {LocalizedMethodFault} from './localized-method-fault';
export interface VmDiskFailedEvent extends VmEvent {
  disk: string;
  reason: LocalizedMethodFault;
}
