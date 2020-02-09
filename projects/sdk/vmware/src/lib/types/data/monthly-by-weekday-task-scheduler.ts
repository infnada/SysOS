import {MonthlyTaskScheduler} from './monthly-task-scheduler';

import {WeekOfMonth} from '../enums/week-of-month';
import {DayOfWeek} from '../enums/day-of-week';

export interface MonthlyByWeekdayTaskScheduler extends MonthlyTaskScheduler {
  offset: WeekOfMonth;
  weekday: DayOfWeek;
}