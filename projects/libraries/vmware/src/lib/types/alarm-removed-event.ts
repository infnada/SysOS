import {AlarmEvent} from './alarm-event';

import {ManagedEntityEventArgument} from './managed-entity-event-argument';
export interface AlarmRemovedEvent extends AlarmEvent {
  entity: ManagedEntityEventArgument;
}
