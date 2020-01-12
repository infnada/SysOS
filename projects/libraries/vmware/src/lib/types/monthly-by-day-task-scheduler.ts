import {MonthlyTaskScheduler} from './monthly-task-scheduler';
import {Int} from './int';

export interface MonthlyByDayTaskScheduler extends MonthlyTaskScheduler {
  day: Int;
}
