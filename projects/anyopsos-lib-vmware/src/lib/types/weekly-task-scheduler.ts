import {DailyTaskScheduler} from './daily-task-scheduler';

export interface WeeklyTaskScheduler extends DailyTaskScheduler {
  friday: boolean;
  monday: boolean;
  saturday: boolean;
  sunday: boolean;
  thursday: boolean;
  tuesday: boolean;
  wednesday: boolean;
}
