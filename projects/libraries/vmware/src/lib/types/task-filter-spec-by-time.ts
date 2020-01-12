import {DynamicData} from './dynamic-data';

import {TaskFilterSpecTimeOption} from './task-filter-spec-time-option';
import {DateTime} from './date-time';
export interface TaskFilterSpecByTime extends DynamicData {
  beginTime?: DateTime;
  endTime?: DateTime;
  timeType: TaskFilterSpecTimeOption;
}
