import {AlarmEvent} from './alarm-event';

import {ManagedEntityEventArgument} from './managed-entity-event-argument';
import {LocalizedMethodFault} from './localized-method-fault';
export interface AlarmScriptFailedEvent extends AlarmEvent {
  entity: ManagedEntityEventArgument;
  reason: LocalizedMethodFault;
  script: string;
}
