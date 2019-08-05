import {TaskScheduler} from './task-scheduler';
import {Int} from './int';

export interface AfterStartupTaskScheduler extends TaskScheduler {
  minute: Int;
}
