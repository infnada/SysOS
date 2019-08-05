import {ScheduledTaskEvent} from './scheduled-task-event';

export interface ScheduledTaskEmailCompletedEvent extends ScheduledTaskEvent {
  to: string;
}
