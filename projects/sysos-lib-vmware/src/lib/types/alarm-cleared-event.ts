import {AlarmEvent} from './alarm-event';

import {ManagedEntityEventArgument} from './managed-entity-event-argument';
export interface AlarmClearedEvent extends AlarmEvent {
  entity: ManagedEntityEventArgument;
  from: string;
  source: ManagedEntityEventArgument;
}
