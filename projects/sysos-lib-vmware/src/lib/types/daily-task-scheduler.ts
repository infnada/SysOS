import {HourlyTaskScheduler} from './hourly-task-scheduler';
import {Int} from './int';

export interface DailyTaskScheduler extends HourlyTaskScheduler {
  hour: Int;
}
