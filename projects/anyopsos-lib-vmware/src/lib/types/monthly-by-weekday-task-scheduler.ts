import {MonthlyTaskScheduler} from './monthly-task-scheduler';

import {WeekOfMonth} from './week-of-month';
import {DayOfWeek} from './day-of-week';
export interface MonthlyByWeekdayTaskScheduler extends MonthlyTaskScheduler {
  offset: WeekOfMonth;
  weekday: DayOfWeek;
}
