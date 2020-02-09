import {MonthlyTaskScheduler} from './monthly-task-scheduler';


export interface MonthlyByDayTaskScheduler extends MonthlyTaskScheduler {
  day: number;
}