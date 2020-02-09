import {AlarmEvent} from './alarm-event';

import {ManagedEntityEventArgument} from './managed-entity-event-argument';

export interface AlarmScriptCompleteEvent extends AlarmEvent {
  entity: ManagedEntityEventArgument;
  script: string;
}