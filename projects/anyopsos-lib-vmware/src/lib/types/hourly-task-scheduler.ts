import {RecurrentTaskScheduler} from './recurrent-task-scheduler';
import {Int} from './int';

export interface HourlyTaskScheduler extends RecurrentTaskScheduler {
  minute: Int;
}
