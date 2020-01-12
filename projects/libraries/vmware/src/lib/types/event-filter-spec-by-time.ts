import {DynamicData} from './dynamic-data';
import {DateTime} from './date-time';

export interface EventFilterSpecByTime extends DynamicData {
  beginTime?: DateTime;
  endTime?: DateTime;
}
