import {AlarmEvent} from './alarm-event';

import {ManagedEntityEventArgument} from './managed-entity-event-argument';
export interface AlarmAcknowledgedEvent extends AlarmEvent {
  entity: ManagedEntityEventArgument;
  source: ManagedEntityEventArgument;
}
