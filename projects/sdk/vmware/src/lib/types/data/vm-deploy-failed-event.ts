import {VmEvent} from './vm-event';

import {EntityEventArgument} from './entity-event-argument';
import {LocalizedMethodFault} from './localized-method-fault';

export interface VmDeployFailedEvent extends VmEvent {
  destDatastore: EntityEventArgument;
  reason: LocalizedMethodFault;
}