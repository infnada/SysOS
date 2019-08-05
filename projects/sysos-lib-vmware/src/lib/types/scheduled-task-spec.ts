import {DynamicData} from './dynamic-data';

import {Action} from './action';
import {TaskScheduler} from './task-scheduler';
export interface ScheduledTaskSpec extends DynamicData {
  action: Action;
  description: string;
  enabled: boolean;
  name: string;
  notification?: string;
  scheduler: TaskScheduler;
}
