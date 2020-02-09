import {AlarmEvent} from './alarm-event';

import {ManagedEntityEventArgument} from './managed-entity-event-argument';

export interface AlarmCreatedEvent extends AlarmEvent {
  entity: ManagedEntityEventArgument;
}