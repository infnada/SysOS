import {ScheduledTaskEvent} from './scheduled-task-event';

import {LocalizedMethodFault} from './localized-method-fault';

export interface ScheduledTaskFailedEvent extends ScheduledTaskEvent {
  reason: LocalizedMethodFault;
}