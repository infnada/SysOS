import {VmEvent} from './vm-event';

import {LocalizedMethodFault} from './localized-method-fault';
export interface MigrationEvent extends VmEvent {
  fault: LocalizedMethodFault;
}
