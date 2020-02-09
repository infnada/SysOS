import {TaskScheduler} from './task-scheduler';


export interface RecurrentTaskScheduler extends TaskScheduler {
  interval: number;
}