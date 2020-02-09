import {TaskScheduler} from './task-scheduler';


export interface AfterStartupTaskScheduler extends TaskScheduler {
  minute: number;
}