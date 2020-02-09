import {TaskScheduler} from './task-scheduler';


export interface OnceTaskScheduler extends TaskScheduler {
  runAt?: string;
}