import {DynamicData} from './dynamic-data';
import {DateTime} from './date-time';

export interface TaskScheduler extends DynamicData {
  activeTime?: DateTime;
  expireTime?: DateTime;
}
