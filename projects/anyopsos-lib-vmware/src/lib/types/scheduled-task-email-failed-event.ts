import {ScheduledTaskEvent} from './scheduled-task-event';

import {LocalizedMethodFault} from './localized-method-fault';
export interface ScheduledTaskEmailFailedEvent extends ScheduledTaskEvent {
  reason: LocalizedMethodFault;
  to: string;
}
