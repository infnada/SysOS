import {GeneralEvent} from './general-event';

import {ManagedEntityEventArgument} from './managed-entity-event-argument';
export interface GeneralUserEvent extends GeneralEvent {
  entity?: ManagedEntityEventArgument;
}
