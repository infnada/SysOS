import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {DateTime} from './date-time';

export interface PerfSampleInfo extends DynamicData {
  interval: Int;
  timestamp: DateTime;
}
