import {HourlyTaskScheduler} from './hourly-task-scheduler';


export interface DailyTaskScheduler extends HourlyTaskScheduler {
  hour: number;
}