import {TaskScheduler} from './task-scheduler';
import {Int} from './int';

export interface RecurrentTaskScheduler extends TaskScheduler {
  interval: Int;
}
