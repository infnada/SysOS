import {DynamicData} from './dynamic-data';

import {TaskFilterSpecTimeOption} from '../enums/task-filter-spec-time-option';

export interface TaskFilterSpecByTime extends DynamicData {
  beginTime?: string;
  endTime?: string;
  timeType: TaskFilterSpecTimeOption;
}