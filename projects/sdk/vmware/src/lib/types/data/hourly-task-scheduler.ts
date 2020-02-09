import {RecurrentTaskScheduler} from './recurrent-task-scheduler';


export interface HourlyTaskScheduler extends RecurrentTaskScheduler {
  minute: number;
}