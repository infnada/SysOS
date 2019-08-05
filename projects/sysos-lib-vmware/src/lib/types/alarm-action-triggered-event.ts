import {AlarmEvent} from './alarm-event';

import {ManagedEntityEventArgument} from './managed-entity-event-argument';
export interface AlarmActionTriggeredEvent extends AlarmEvent {
  entity: ManagedEntityEventArgument;
  source: ManagedEntityEventArgument;
}
