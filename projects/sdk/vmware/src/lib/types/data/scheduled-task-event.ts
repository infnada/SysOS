import {Event} from './event';

import {ManagedEntityEventArgument} from './managed-entity-event-argument';
import {ScheduledTaskEventArgument} from './scheduled-task-event-argument';

export interface ScheduledTaskEvent extends Event {
  entity: ManagedEntityEventArgument;
  scheduledTask: ScheduledTaskEventArgument;
}