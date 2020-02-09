import {AlarmEvent} from './alarm-event';

import {ManagedEntityEventArgument} from './managed-entity-event-argument';

export interface AlarmEmailCompletedEvent extends AlarmEvent {
  entity: ManagedEntityEventArgument;
  to: string;
}