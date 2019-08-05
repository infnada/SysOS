import {ScheduledTaskEvent} from './scheduled-task-event';

import {ChangesInfoEventArgument} from './changes-info-event-argument';
export interface ScheduledTaskReconfiguredEvent extends ScheduledTaskEvent {
  configChanges?: ChangesInfoEventArgument;
}
