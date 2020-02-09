import {DynamicData} from './dynamic-data';

import {TypeDescription} from './type-description';
import {ElementDescription} from './element-description';
import {ScheduledTaskDetail} from './scheduled-task-detail';

export interface ScheduledTaskDescription extends DynamicData {
  action: TypeDescription[];
  dayOfWeek: ElementDescription[];
  schedulerInfo: ScheduledTaskDetail[];
  state: ElementDescription[];
  weekOfMonth: ElementDescription[];
}