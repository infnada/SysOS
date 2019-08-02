import {TaskFilterSpecTimeOption} from './task-filter-spec-time-option';
import {DateTime} from './date-time';

export interface TaskFilterSpecByTime {
  beginTime?: DateTime;
  endTime?: DateTime;
  timeType: TaskFilterSpecTimeOption;
}
