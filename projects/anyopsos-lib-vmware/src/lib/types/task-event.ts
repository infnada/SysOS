import {Event} from './event';

import {TaskInfo} from './task-info';
export interface TaskEvent extends Event {
  info: TaskInfo;
}
