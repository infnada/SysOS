import {TaskScheduler} from './task-scheduler';
import {DateTime} from './date-time';

export interface OnceTaskScheduler extends TaskScheduler {
  runAt?: DateTime;
}
