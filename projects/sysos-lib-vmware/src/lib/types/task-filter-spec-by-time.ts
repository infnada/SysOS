import {TaskFilterSpecTimeOption} from "./task-filter-spec-time-option";

export interface TaskFilterSpecByTime {
  beginTime?: Date;
  endTime?: Date;
  timeType: TaskFilterSpecTimeOption;
}
